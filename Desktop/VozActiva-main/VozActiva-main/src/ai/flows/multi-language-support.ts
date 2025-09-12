'use server';

/**
 * @fileOverview An AI agent that supports multi-language text-to-speech conversion.
 *
 * - multiLanguageTextToSpeech - A function that converts text to speech in multiple languages based on automatic language detection.
 * - MultiLanguageTextToSpeechInput - The input type for the multiLanguageTextToSpeech function.
 * - MultiLanguageTextToSpeechOutput - The return type for the multiLanguageTextToSpeech function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const MultiLanguageTextToSpeechInputSchema = z.object({
  text: z
    .string()
    .describe('The text to convert to speech. The language will be automatically detected.'),
  voice: z.enum(['male', 'female']).describe('The voice to use for the speech.'),
});
export type MultiLanguageTextToSpeechInput = z.infer<
  typeof MultiLanguageTextToSpeechInputSchema
>;

const MultiLanguageTextToSpeechOutputSchema = z.object({
  media: z
    .string()
    .describe('The audio data in WAV format as a data URI.'),
});
export type MultiLanguageTextToSpeechOutput = z.infer<
  typeof MultiLanguageTextToSpeechOutputSchema
>;

export async function multiLanguageTextToSpeech(
  input: MultiLanguageTextToSpeechInput
): Promise<MultiLanguageTextToSpeechOutput> {
  return multiLanguageTextToSpeechFlow(input);
}

const multiLanguageTextToSpeechFlow = ai.defineFlow(
  {
    name: 'multiLanguageTextToSpeechFlow',
    inputSchema: MultiLanguageTextToSpeechInputSchema,
    outputSchema: MultiLanguageTextToSpeechOutputSchema,
  },
  async input => {
    const voiceName = input.voice === 'female' ? 'Achernar' : 'Algenib';
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: voiceName},
          },
        },
      },
      prompt: input.text,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
