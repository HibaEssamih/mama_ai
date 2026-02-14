// lib/generateMamaResponse.ts
// Supports OpenAI (GPT-4o etc.) or MiniMax. Set OPENAI_API_KEY to use OpenAI.

const MAMA_SYSTEM_PROMPT = `You are Mama AI, a warm and supportive Moroccan pregnancy assistant. 
You speak fluently in Darija (Moroccan Arabic) and make pregnant people feel heard and safe.

Your role:
- Answer questions about pregnancy, nutrition, rest, and well-being in a caring way.
- Use Darija naturally; you may mix in French or standard Arabic when it fits.
- Never replace medical advice—encourage users to see a doctor or midwife when needed.
- Be reassuring, culturally aware, and respectful of Moroccan family and health practices.

Keep responses clear, concise, and supportive.`;

const FALLBACK_DARIJA =
  "Ana smahiti, ma tqderch t7awl daba. Ila bghiti, 3awed t7awel w goli b 7aloha. Baraka min fadlik tsajli m3a tabiba wla qabla 7ta tqder t7awl m3ahum.";

export type PatientContext = {
  name?: string;
  gestational_week?: number;
  risk_level?: string;
  [key: string]: string | number | boolean | undefined;
};

function buildUserPrompt(message: string, patientContext: PatientContext): string {
  const contextDetails = Object.entries(patientContext)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");
  return contextDetails
    ? `Patient Info: (${contextDetails})\nPatient Message: ${message}`
    : message;
}

async function callOpenAI(userPrompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o";
  console.log("[Mama AI] Using OpenAI, model:", model);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: MAMA_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    }),
  });

  console.log("[Mama AI] OpenAI response status:", response.status);

  if (!response.ok) {
    const errText = await response.text();
    console.error("[Mama AI] OpenAI API error:", response.status, errText.slice(0, 500));
    throw new Error(`OpenAI API error: ${response.status} - ${errText}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    error?: { message?: string };
  };
  const content = data.choices?.[0]?.message?.content?.trim();
  if (content) {
    console.log("[Mama AI] OpenAI returned content, length:", content.length);
    return content;
  }
  if (data.error?.message) {
    console.error("[Mama AI] OpenAI response error field:", data.error.message);
  }
  console.warn("[Mama AI] OpenAI empty content, using fallback");
  return FALLBACK_DARIJA;
}

async function callMiniMax(userPrompt: string): Promise<string> {
  const model = process.env.MINIMAX_MODEL ?? "abab6.5s-chat";
  console.log("[Mama AI] Using MiniMax, model:", model);

  const response = await fetch("https://api.minimax.io/v1/text/chatcompletion_v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MINIMAX_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: MAMA_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    }),
  });

  console.log("[Mama AI] MiniMax response status:", response.status);

  if (!response.ok) {
    const errText = await response.text();
    console.error("[Mama AI] MiniMax API error:", response.status, errText.slice(0, 500));
    throw new Error(`MiniMax API error: ${response.status} - ${errText}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    base_resp?: { status_code?: number; status_msg?: string };
  };
  const content = data.choices?.[0]?.message?.content?.trim();
  if (content) {
    console.log("[Mama AI] MiniMax returned content, length:", content.length);
    return content;
  }
  if (data.base_resp?.status_code !== undefined && data.base_resp.status_code !== 0) {
    console.warn("[Mama AI] MiniMax API non-zero status:", data.base_resp.status_msg ?? data.base_resp.status_code);
  } else {
    console.warn("[Mama AI] MiniMax empty content, raw keys:", Object.keys(data).join(", "));
  }
  console.warn("[Mama AI] Using fallback response");
  return FALLBACK_DARIJA;
}

export async function generateMamaResponse(
  message: string,
  patientContext: PatientContext = {}
): Promise<string> {
  console.log("[Mama AI] generateMamaResponse called, message length:", message.length, "context keys:", Object.keys(patientContext).join(", ") || "none");
  const userPrompt = buildUserPrompt(message, patientContext);

  if (process.env.OPENAI_API_KEY) {
    try {
      return await callOpenAI(userPrompt);
    } catch (err) {
      console.error("[Mama AI] callOpenAI failed:", err instanceof Error ? err.message : String(err));
      throw err;
    }
  }
  if (process.env.MINIMAX_API_KEY) {
    try {
      return await callMiniMax(userPrompt);
    } catch (err) {
      console.error("[Mama AI] callMiniMax failed:", err instanceof Error ? err.message : String(err));
      throw err;
    }
  }
  console.error("[Mama AI] No OPENAI_API_KEY or MINIMAX_API_KEY set");
  throw new Error(
    "Set OPENAI_API_KEY or MINIMAX_API_KEY in environment variables."
  );
}
