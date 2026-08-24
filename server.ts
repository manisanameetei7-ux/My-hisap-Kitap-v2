import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";

const PORT = 3000;

// In-memory audio cache for instant playback
const audioCache = new Map<string, { audioBase64: string; mimeType: string }>();

let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "5mb" }));

  // API Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Human Voice TTS Endpoint using Gemini Flash TTS
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, lang = "en", voice = "Kore", emotion = "warm and friendly shopkeeper" } = req.body;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      const cacheKey = `${lang}_${voice}_${text.trim()}`;
      if (audioCache.has(cacheKey)) {
        const cached = audioCache.get(cacheKey)!;
        return res.json({
          audio: cached.audioBase64,
          mimeType: cached.mimeType,
          cached: true,
        });
      }

      const ai = getAI();
      if (!ai) {
        return res.status(503).json({
          error: "Gemini API Key is not configured on server",
          fallback: true,
        });
      }

      // Voice mapping for ultra-natural human tone
      // Supported prebuilt Gemini TTS voices:
      // Female: 'Kore' (warm natural female), 'Zephyr' (calm gentle female), 'Aoede' (melodic female)
      // Male: 'Puck' (cheerful energetic male), 'Fenrir' (confident narrator), 'Charon' (articulate professional)
      const validVoices = ["Kore", "Zephyr", "Aoede", "Puck", "Fenrir", "Charon"];
      const selectedVoice = validVoices.includes(voice) ? voice : "Kore";
      const isFemale = ["Kore", "Zephyr", "Aoede"].includes(selectedVoice);

      // Formulate expressive natural human speech prompt based on language and persona gender
      let speechPrompt = text;
      if (lang === "as") {
        if (isFemale) {
          speechPrompt = `You are a native Assamese female educator and store guide speaking in a warm, pleasant, ultra-realistic Assamese female voice (অসমীয়া মহিলা কণ্ঠ) with pristine Assamese pronunciation and natural inflection. Deliver this step-by-step tutorial clearly and engagingly in authentic Assamese: ${text}`;
        } else {
          speechPrompt = `You are a native Assamese male store guide speaking in an authentic, clear, friendly Assamese male voice (অসমীয়া পুৰুষ কণ্ঠ) with smooth natural human cadence: ${text}`;
        }
      } else if (lang === "bn") {
        if (isFemale) {
          speechPrompt = `Speak in an authentic, fluent, warm Bengali female conversational tone (বাংলা মহিলা কণ্ঠ) with natural rhythm and clarity: ${text}`;
        } else {
          speechPrompt = `Speak in an authentic, fluent, clear Bengali male conversational tone with natural rhythm: ${text}`;
        }
      } else if (lang === "hi") {
        if (isFemale) {
          speechPrompt = `Speak naturally in a warm, polite Hindi female conversational tone (हिंदी महिला आवाज़) like a friendly store companion: ${text}`;
        } else {
          speechPrompt = `Speak naturally in a polite, confident Hindi male conversational tone: ${text}`;
        }
      } else {
        if (isFemale) {
          speechPrompt = `Speak naturally in a warm, expressive, clear human female voice: ${text}`;
        } else {
          speechPrompt = `Speak naturally in a confident, helpful human male voice: ${text}`;
        }
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: speechPrompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });

      const audioBase64 =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!audioBase64) {
        return res.status(500).json({ error: "Failed to synthesize speech audio" });
      }

      const mimeType = "audio/pcm;rate=24000";
      audioCache.set(cacheKey, { audioBase64, mimeType });

      return res.json({
        audio: audioBase64,
        mimeType,
        cached: false,
      });
    } catch (err: any) {
      console.error("TTS generation error:", err?.message || err);
      return res.status(500).json({
        error: err?.message || "Internal server error during speech synthesis",
        fallback: true,
      });
    }
  });

  // Vite development middleware vs production static handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Hisab Kitap Server running on http://localhost:${PORT}`);
  });
}

startServer();
