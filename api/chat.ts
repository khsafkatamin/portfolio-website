
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

import { SKILLS } from './data/SkillsData';
import { TIMELINE_DATA } from './data/TimelineData';

// Vercel exports a handler function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages are required and must be an array' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEM_API_KEY });

    // Construct a system instruction with portfolio context
    const portfolioContext = `
      You are Safkat's friendly and professional portfolio assistant.
      Your goal is to answer questions about Safkat based on the information provided below.
      Be helpful and concise. If a question is outside the scope of this portfolio, politely state that you can only answer questions about Safkat's professional background.

      Here is Safkat's portfolio information:
      
      SKILLS:
      ${JSON.stringify(SKILLS, null, 2)}

      EXPERIENCE & EDUCATION:
      ${JSON.stringify(TIMELINE_DATA, null, 2)}
    `;

    const model = 'gemini-2.5-flash';
    
    // Fix: The Gemini API requires the conversation history to start with a 'user' role.
    // The client-side messages array starts with a 'bot' greeting, which we remove for the API call.
    const historyForApi = messages[0]?.sender === 'bot' ? messages.slice(1) : messages;

    if (historyForApi.length === 0) {
      return res.status(400).json({ error: 'Cannot process an empty conversation.' });
    }

    // Convert message history for the API
    const contents = historyForApi.map((msg: { sender: string; text: string }) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            systemInstruction: portfolioContext
        }
    });

    res.status(200).json({ text: response.text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
}
