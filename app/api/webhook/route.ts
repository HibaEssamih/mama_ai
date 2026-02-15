import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { generateMamaResponse } from "@/lib/generateMamaResponse";
import { generateClinicalResume } from "@/lib/generateClinicalResume";
import { analyzeSymptomRisk } from "@/lib/symptoms";
import { transcribeAudio } from "@/lib/transcribe";
import { generateSpeech } from "@/lib/speak"; 
import { normalizePhone, formatForWhatsApp } from "@/lib/phoneUtils";

async function processMessageInBackground(body: any) {
  const supabase = await createClient();
  
  try {
    const entry = body.entry?.[0];
    const value = entry?.changes?.[0]?.value;
    const messageObj = value?.messages?.[0];
    if (!messageObj) return;

    const senderPhone = messageObj.from;
    const wamid = messageObj.id;
    const isAudio = messageObj.type === "audio";
    let userText = "";

    console.log(`[Webhook] New message from ${senderPhone}. Type: ${messageObj.type}`);

    // --- 1. TRANSCRIPTION (If Audio) ---
    if (isAudio) {
      console.log("[Audio Debug] Processing incoming audio...");
      const audioId = messageObj.audio?.id;
      const token = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
      const mediaRes = await fetch(`https://graph.facebook.com/v18.0/${audioId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const mediaData = await mediaRes.json();
      
      if (mediaData.url) {
        const fileRes = await fetch(mediaData.url, { headers: { Authorization: `Bearer ${token}` } });
        const buffer = Buffer.from(await fileRes.arrayBuffer());
        userText = await transcribeAudio(buffer); 
        console.log(`[Audio Debug] Transcription result: "${userText}"`);
      }
    } else {
      userText = messageObj.text?.body ?? "";
    }

    if (!userText.trim()) return;

    // --- 2. CONTEXT & RISK ---
    const normalizedPhone = normalizePhone(senderPhone);
    const { data: patient } = await supabase.from("patients").select("*").eq("phone_number", normalizedPhone).maybeSingle();
    if (!patient) {
        console.log("[Webhook] Patient not found in DB.");
        return;
    }

    let { data: conv } = await supabase.from("conversations").select("id").eq("patient_id", patient.id).maybeSingle();
    if (!conv) {
      const { data: newC } = await supabase.from("conversations").insert({ patient_id: patient.id }).select().single();
      conv = newC;
    }

    const risk = analyzeSymptomRisk(userText);

    // --- 3. GENERATE AI TEXT RESPONSE ---
    const aiResponse = await generateMamaResponse(userText, {
      name: patient.full_name || patient.name,
      risk_level: risk.urgency,
      gestational_week: patient.gestational_week,
    });

    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
    const token = process.env.WHATSAPP_ACCESS_TOKEN?.trim();

    if (phoneId && token) {
      // --- 4. SEND TEXT IMMEDIATELY ---
      console.log("[Webhook] Sending text response first...");
      await sendTextWhatsapp(phoneId, token, normalizedPhone, aiResponse);

      // --- 5. GENERATE & SEND AUDIO IN BACKGROUND ---
      if (isAudio) {
        console.log("[Audio Debug] Starting ElevenLabs TTS generation...");
        try {
          const audioBuffer = await generateSpeech(aiResponse);
          console.log(`[Audio Debug] TTS Buffer generated. Size: ${audioBuffer.length} bytes`);

          const fileName = `replies/${conv!.id}/${Date.now()}.mp3`;
          
          console.log("[Audio Debug] Uploading to Supabase Storage...");
          const { data: upload, error: uploadErr } = await supabase.storage
            .from("patient-voice-notes")
            .upload(fileName, audioBuffer, { contentType: "audio/mpeg", upsert: true });

          if (uploadErr) {
              console.error("[Audio Debug] Supabase Storage Upload Error:", uploadErr);
              throw uploadErr;
          }

          if (upload) {
            const { data: publicUrlData } = supabase.storage.from("patient-voice-notes").getPublicUrl(fileName);
            const voiceUrl = publicUrlData.publicUrl;
            console.log("[Audio Debug] Public URL generated:", voiceUrl);
            
            console.log("[Audio Debug] Sending audio message to WhatsApp API...");
            const whatsappRes = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
              method: "POST",
              headers: { 
                  "Authorization": `Bearer ${token}`, 
                  "Content-Type": "application/json" 
              },
              body: JSON.stringify({
                messaging_product: "whatsapp",
                to: formatForWhatsApp(normalizedPhone),
                type: "audio",
                audio: { link: voiceUrl },
              }),
            });

            const waResult = await whatsappRes.json();
            if (!whatsappRes.ok) {
                console.error("[Audio Debug] WhatsApp Media API rejected the audio link:", waResult);
            } else {
                console.log("[Audio Debug] ✅ Audio message sent successfully!");
            }
          }
        } catch (err) {
          console.error("[Audio Debug] ❌ Delayed Audio Pipeline Failed:", err);
        }
      }
    }

    // --- 6. UPDATE DB ---
    Promise.all([
      supabase.from("messages").insert({ conversation_id: conv!.id, role: "assistant", content: aiResponse }),
      generateClinicalResume({
        gestational_week: patient.gestational_week,
        risk_level: risk.urgency,
        conversationTranscript: userText,
      }).then(resume => 
        supabase.from("patients").update({ 
          risk_level: risk.urgency,
          medical_history: { ...patient.medical_history, clinical_resume: resume }
        }).eq("id", patient.id)
      )
    ]);

  } catch (error) {
    console.error("🔥 Webhook Background Error:", error);
  }
}

async function sendTextWhatsapp(phoneId: string, token: string, to: string, text: string) {
  return fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: formatForWhatsApp(to),
      text: { body: text },
    }),
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("hub.verify_token") === process.env.VERIFY_TOKEN) {
    return new NextResponse(searchParams.get("hub.challenge"), { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return new NextResponse("Invalid JSON", { status: 400 });
  }
  const isMessage = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (isMessage) {
    processMessageInBackground(body);
    return new NextResponse("EVENT_RECEIVED", { status: 200 });
  }
  return new NextResponse("NOT_A_MESSAGE", { status: 200 });
}