import Groq from "groq-sdk";
import { Folder } from "@prisma/client";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const buildSystemPrompt = (userName: string, folderTree: any[]) => `
You are Study Buddy AI, a friendly and highly capable academic assistant for ${userName}.

## User's Study Structure
${JSON.stringify(folderTree, null, 2)}

## Your Capabilities
- Help organize folders and suggest better folder structures.
- Summarize notes in clear, concise bullet points.
- Create personalized study plans based on the user's folder content.
- Answer academic questions across all subjects.
- Generate quiz questions to test understanding.
- Suggest time management strategies.

## Behavior Rules
- Always be encouraging and positive.
- When suggesting folder structures, reference the user's existing folders by name.
- Keep responses concise unless the user asks for detail.
- For study plans, always ask about available days per week before generating.
- Format lists and plans using markdown for readability.
- Use LaTeX for mathematical formulas where appropriate ($formula$).
`;

export const getGroqChatStream = async (
  userName: string,
  folderTree: any[],
  messages: any[]
) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: buildSystemPrompt(userName, folderTree),
      },
      ...messages,
    ],
    model: "llama-3.3-70b-versatile",
    stream: true,
  });
};
