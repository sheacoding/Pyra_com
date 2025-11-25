import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

// Initialize the client. The API key is guaranteed to be in process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Asks the AI helper a question about Pyra.
 */
export const askPyraAssistant = async (query: string, language: Language = 'en'): Promise<string> => {
  try {
    const langName = language === 'zh' ? 'Chinese (Simplified)' : 'English';
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: `You are the AI Assistant for "Pyra", a beginner-friendly Python IDE.
        
        IMPORTANT: You must reply in ${langName}.

        Key Positioning:
        - **Target Audience**: Beginners, Product Managers (PMs), Educators, and Makers.
        - **Value Prop**: "Zero Barrier to Entry". No complex configuration (VSCode is too hard, Thonny is too ugly).
        - **Use Cases**: 
           - PMs: Verifying logic, data processing, API testing, prototyping.
           - Students: Learning Python without fighting environment issues.
           - Makers: Controlling hardware (ESP32/Pico).
        
        Key Technical Facts:
        - **Tech Stack**: React/Vite (Frontend) + Rust/Tauri (Backend).
        - **Performance**: Starts in < 1 second.
        - **Features**: Built-in 'uv' package manager, Monaco Editor, Bilingual hints.
        
        Tone: Welcoming, simple, encouraging. Avoid overly complex jargon unless asked.`,
        temperature: 0.7,
      },
    });

    if (response.text) {
      return response.text;
    }
    return "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to reach the AI assistant.");
  }
};