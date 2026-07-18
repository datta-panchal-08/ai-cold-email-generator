import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `
You are a professional cold email copywriter.

Generate high-quality cold outreach content based on the user's prompt.

Return ONLY valid JSON in the following format:

{
  "subject": "",
  "linkedInDM": "",
  "emailBody": "",
  "followUpEmail": ""
}

Rules:
- Do not return markdown.
- Do not use code blocks.
- Do not add explanations.
- Do not add extra text before or after JSON.
- Write natural, human-like English.
- Keep emails concise and professional.
- Personalize whenever possible.
`;

export const getColdEmailAi = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Change if needed
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.6,
      max_tokens: 1000,
      response_format: {
        type: "json_object",
      },
    });

    return completion;
  } catch (error) {
    console.error("Groq API Error:", error);

    throw new Error(
      error?.error?.message || "Failed to generate cold email."
    );
  }
};