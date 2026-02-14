import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { generateMamaResponse } from "@/lib/generateMamaResponse";
import { analyzeSymptomRisk } from "@/lib/symptoms";

const SUPABASE_PROJECT_URL_REGEX = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?/;

export async function POST(request: NextRequest) {
  // 0. Parse Body safely
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || !SUPABASE_PROJECT_URL_REGEX.test(supabaseUrl)) {
    console.error("Webhook: Invalid NEXT_PUBLIC_SUPABASE_URL.");
    return new NextResponse(null, { status: 200 });
  }

  const supabase = await createClient();

  try {
    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const messageObj = change?.value?.messages?.[0];

    // If it's not a message (e.g., a status update), acknowledge and stop
    if (!messageObj || !messageObj.text?.body) {
      return new NextResponse(null, { status: 200 });
    }

    const senderPhone = messageObj.from;
    const userText = messageObj.text.body;
    const wamid = messageObj.id;

    // 1. Deduplication: Prevent processing the same WhatsApp message twice
    const { data: existingMsg } = await supabase
      .from("messages")
      .select("id")
      .filter("metadata->>wamid", "eq", wamid)
      .maybeSingle();

    if (existingMsg) return new NextResponse(null, { status: 200 });

    // 2. Patient Logic: Find or Create the mother in the DB
    const { data: patientData, error: patientError } = await supabase
      .from("patients")
      .select("id")
      .eq("phone_number", senderPhone)
      .maybeSingle();

    if (patientError) throw patientError;

    let patient = patientData;
    if (!patient) {
      console.log("New mother detected. Registering...");
      const { data: newPatient, error: createError } = await supabase
        .from("patients")
        .insert({
          phone_number: senderPhone,
          name: "New Mother",
          risk_level: "low",
        })
        .select()
        .single();

      if (createError) throw createError;
      patient = newPatient;
    }

    // 3. Conversation Logic: Get current session or create new
    const { data: convData, error: convLookupError } = await supabase
      .from("conversations")
      .select("id")
      .eq("patient_id", patient!.id)
      .maybeSingle();

    if (convLookupError) throw convLookupError;

    let conv = convData;
    if (!conv) {
      const { data: newConv, error: createConvError } = await supabase
        .from("conversations")
        .insert({ patient_id: patient!.id })
        .select()
        .single();

      if (createConvError) throw createConvError;
      conv = newConv;
    }

    // 4. Save User Message & Analyze Risk
    const risk = analyzeSymptomRisk(userText);
    const { data: savedMsg, error: msgError } = await supabase
      .from("messages")
      .insert({
        conversation_id: conv!.id,
        role: "user",
        content: userText,
        metadata: { wamid, risk: risk.urgency }
      })
      .select()
      .single();

    if (msgError) throw msgError;

    // 5. Create Alert & Update Patient if High Risk
    if (risk.urgency === "high" || risk.urgency === "critical") {
      await supabase.from("alerts").insert({
        patient_id: patient!.id,
        message_id: savedMsg!.id,
        urgency: risk.urgency,
        symptom_name: risk.symptom
      });
      
      await supabase
        .from("patients")
        .update({ risk_level: risk.urgency })
        .eq("id", patient!.id);
    }

    // 6. AI Response Generation (OpenAI/MiniMax)
    const aiResponse = await generateMamaResponse(userText, {
        name: "Mama AI",
        risk_level: risk.urgency
    });

    // 7. Send Reply via WhatsApp (With Fixes for "Fetch Failed")
    const rawPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const rawToken = process.env.WHATSAPP_ACCESS_TOKEN;

    // CRITICAL FIX: Trim any hidden spaces or characters from IDs
    const phoneId = rawPhoneId?.trim();
    const token = rawToken?.trim();

    if (!phoneId || !token) {
      console.error("CRITICAL: WhatsApp credentials missing in .env");
    } else {
      const whatsappUrl = `https://graph.facebook.com/v18.0/${phoneId}/messages`;
      
      try {
        console.log(`[WhatsApp] Attempting to send message to ${senderPhone}...`);
        const whatsappResponse = await fetch(whatsappUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: senderPhone,
            type: "text",
            text: { body: aiResponse },
          }),
        });

        if (!whatsappResponse.ok) {
          const errorDetail = await whatsappResponse.json().catch(() => ({}));
          console.error("WhatsApp API Error:", whatsappResponse.status, JSON.stringify(errorDetail, null, 2));
        } else {
          console.log("✅ Message successfully delivered to WhatsApp!");
        }
      } catch (fetchErr: any) {
        // This catches the 'fetch failed' network error
        console.error("CRITICAL NETWORK ERROR: Fetch to WhatsApp failed.", fetchErr.message);
        console.log("Tip: Check if your Moroccan network is blocking graph.facebook.com.");
      }
    }

    // 8. Save Assistant Response to Database
    await supabase.from("messages").insert({
      conversation_id: conv!.id,
      role: "assistant",
      content: aiResponse
    });

    return new NextResponse(null, { status: 200 });

  } catch (error: any) {
    console.error("Webhook Handler General Error:", error.message || error);
    return new NextResponse(null, { status: 200 }); // Meta expects 200 even on error
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}