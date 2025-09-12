"use server";

import { multiLanguageTextToSpeech } from "@/ai/flows/multi-language-support";

export async function generateSpeech(
  text: string,
  voice: "male" | "female"
): Promise<{ audioSrc: string | null; error: string | null }> {
  if (!text || text.trim().length === 0) {
    return { audioSrc: null, error: "El texto no puede estar vacío." };
  }
  if (text.length > 1000) {
    return {
      audioSrc: null,
      error: "El texto no puede exceder los 1000 caracteres.",
    };
  }

  try {
    const result = await multiLanguageTextToSpeech({ text, voice });
    if (!result.media) {
      return { audioSrc: null, error: "No se pudo generar el audio." };
    }
    return { audioSrc: result.media, error: null };
  } catch (e) {
    console.error(e);
    return {
      audioSrc: null,
      error: "Error al generar el audio. Por favor, inténtelo de nuevo.",
    };
  }
}
