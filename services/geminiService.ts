import { GoogleGenAI, Type } from "@google/genai";
import { SongRecommendation } from "../types";

// TypeScript가 빌드 시점에 process.env.API_KEY를 인식할 수 있도록 선언합니다.
// 실제 값은 Vite의 'define' 설정을 통해 런타임에 주입됩니다.
declare const process: {
  env: {
    API_KEY: string;
  };
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMusicRecommendations = async (theme: string): Promise<SongRecommendation[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Recommend 7 songs for a commute based on this theme: "${theme}". 
    The list must include exactly 5 Korean songs (Region: KOREA) and 2 International songs (Region: INTERNATIONAL). 
    Focus on songs that are great for listening on a bus or subway.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Song title" },
            artist: { type: Type.STRING, description: "Artist name" },
            genre: { type: Type.STRING, description: "Music genre" },
            mood: { type: Type.STRING, description: "Dominant mood: energetic, calm, dreamy, nostalgic, or bright" },
            region: { type: Type.STRING, enum: ["KOREA", "INTERNATIONAL"], description: "Origin region" },
            reason: { type: Type.STRING, description: "Brief reason why it's good for the commute in Korean" },
          },
          required: ["title", "artist", "genre", "mood", "region", "reason"]
        }
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    const data = JSON.parse(text);
    return data;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("음악 추천 정보를 가져오는 데 실패했습니다.");
  }
};