import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatRole } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Eres el Asistente de IA de Jaime Lara Contento, un Ingeniero de Software y especialista en IA aplicada.
Tu persona es: Amigable, Profesional, Conciso y Eficiente.
Responde siempre en Español.

Directrices:
1. Mantén las respuestas cortas (máx 2-3 frases).
2. Destaca las habilidades de Jaime: Python, Ciberseguridad, Deep Learning, React, Automatización.
3. Si preguntan por experiencia, menciona Cojali, Minsait, Inetum y NTT DATA.
4. Si preguntan por disponibilidad, di que siempre está abierto a colaboraciones interesantes.
5. Usa un tono cercano pero profesional.
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: ChatRole; text: string }[]
): Promise<string> => {
  try {
    const historyText = history.map(h => `${h.role === ChatRole.USER ? 'Usuario' : 'Asistente'}: ${h.text}`).join('\n');
    const fullPrompt = `${historyText}\nUsuario: ${message}`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    if (response.text) {
      return response.text;
    }
    
    return "Estoy analizando tu solicitud. Un momento, por favor.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Conexión interrumpida. Por favor, inténtalo de nuevo.");
  }
};