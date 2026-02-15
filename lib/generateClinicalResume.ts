/**
 * Generates a short, professional clinical resume in medical English from
 * patient conversation history. Used to update patient.medical_history.clinical_resume.
 * Kept under 50 words; focuses on symptoms and physiological status.
 */

const SYSTEM_PROMPT = `You are a clinical summarizer for obstetric care. You will receive a transcript of a conversation between a pregnant patient and an assistant (messages may be in Darija, Arabic, or mixed language).

Your task: Write a CLINICAL RESUME in professional medical English for the treating physician. 
- Focus STRICTLY on symptoms, signs, and physiological status mentioned by the patient.
- Use standard medical terminology. Do not include greetings, reassurance, or non-clinical content.
- Maximum 50 words. Output ONLY the summary paragraph—no preamble, no "Summary:" label, no bullet points.`;

export type ClinicalResumeContext = {
  gestational_week?: number;
  risk_level?: string;
  /** Recent messages: "user: ..." or "assistant: ..." per line */
  conversationTranscript: string;
};

function buildUserPrompt(ctx: ClinicalResumeContext): string {
  const parts: string[] = [];
  if (ctx.gestational_week != null) parts.push(`Gestational age: ${ctx.gestational_week} weeks.`);
  if (ctx.risk_level) parts.push(`Current risk level: ${ctx.risk_level}.`);
  parts.push("\nConversation transcript:\n" + (ctx.conversationTranscript || "(No messages yet)"));
  return parts.join("\n");
}

async function callOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("[ClinicalResume] OpenAI error:", response.status, errText.slice(0, 300));
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const content = data.choices?.[0]?.message?.content?.trim();
  if (content) return content;
  throw new Error("OpenAI returned empty content");
}

async function callMiniMax(systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch("https://api.minimax.io/v1/text/chatcompletion_v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MINIMAX_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.MINIMAX_MODEL ?? "abab6.5s-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("[ClinicalResume] MiniMax error:", response.status, errText.slice(0, 300));
    throw new Error(`MiniMax API error: ${response.status}`);
  }

  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const content = data.choices?.[0]?.message?.content?.trim();
  if (content) return content;
  throw new Error("MiniMax returned empty content");
}

/** Trims to ~50 words and ensures a single paragraph. */
function normalizeResume(text: string): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  const words = trimmed.split(/\s+/);
  if (words.length <= 50) return trimmed;
  return words.slice(0, 50).join(" ") + ".";
}

/**
 * Generates a clinical resume string from conversation context.
 * Returns a professional medical English summary, max 50 words.
 */
export async function generateClinicalResume(ctx: ClinicalResumeContext): Promise<string> {
  const userPrompt = buildUserPrompt(ctx);

  if (process.env.OPENAI_API_KEY) {
    const raw = await callOpenAI(SYSTEM_PROMPT, userPrompt);
    return normalizeResume(raw);
  }
  if (process.env.MINIMAX_API_KEY) {
    const raw = await callMiniMax(SYSTEM_PROMPT, userPrompt);
    return normalizeResume(raw);
  }
  throw new Error("Set OPENAI_API_KEY or MINIMAX_API_KEY for clinical resume generation.");
}
