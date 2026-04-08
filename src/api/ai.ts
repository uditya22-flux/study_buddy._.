import client from "./client";

export const streamChat = async (
  message: string, 
  history: any[], 
  onChunk: (text: string) => void
) => {
  const token = localStorage.getItem("accessToken");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

  const response = await fetch(`${API_URL}/ai/chat`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ message, conversationHistory: history }),
  });

  if (!response.body) return;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter(l => l.startsWith("data:"));

    for (const line of lines) {
      const dataStr = line.replace("data: ", "");
      if (dataStr === "[DONE]") return;

      try {
        const data = JSON.parse(dataStr);
        if (data.text) {
          onChunk(data.text);
        }
      } catch (err) {
        console.error("Error parsing SSE chunk", err);
      }
    }
  }
};
