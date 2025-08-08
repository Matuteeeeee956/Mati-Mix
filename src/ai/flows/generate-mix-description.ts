'use server';

/**
 * @fileOverview Generates a compelling description for a DJ mix using AI.
 *
 * - generateMixDescription - A function that generates the mix description.
 * - GenerateMixDescriptionInput - The input type for the generateMixDescription function.
 * - GenerateMixDescriptionOutput - The return type for the generateMixDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMixDescriptionInputSchema = z.object({
  mixTitle: z.string().describe('The title of the mix.'),
  genre: z.string().describe('The genre of the mix.'),
  mood: z.string().describe('The mood or feeling of the mix (e.g., energetic, chill, etc.).'),
  keyHighlights: z.string().describe('Key highlights or standout tracks in the mix.'),
  djName: z.string().describe('The name of the DJ who created the mix.'),
  eventInfo: z.string().optional().describe('Information about the event where the mix was recorded, if applicable.'),
});
export type GenerateMixDescriptionInput = z.infer<typeof GenerateMixDescriptionInputSchema>;

const GenerateMixDescriptionOutputSchema = z.object({
  description: z.string().describe('A captivating description of the DJ mix.'),
});
export type GenerateMixDescriptionOutput = z.infer<typeof GenerateMixDescriptionOutputSchema>;

export async function generateMixDescription(input: GenerateMixDescriptionInput): Promise<GenerateMixDescriptionOutput> {
  return generateMixDescriptionFlow(input);
}

const generateMixDescriptionPrompt = ai.definePrompt({
  name: 'generateMixDescriptionPrompt',
  input: {
    schema: GenerateMixDescriptionInputSchema,
  },
  output: {
    schema: GenerateMixDescriptionOutputSchema,
  },
  prompt: `Eres un experto creador de contenido para DJ mixes. Tu objetivo es generar descripciones atractivas y concisas para los mixes, optimizadas para captar la atención de los oyentes.

  Mix Title: {{{mixTitle}}}
  Genre: {{{genre}}}
  Mood: {{{mood}}}
  Key Highlights: {{{keyHighlights}}}
  DJ Name: {{{djName}}}
  Event Info: {{{eventInfo}}}

  Genera una descripción que destaque los aspectos más atractivos del mix, utilizando un lenguaje que resuene con los amantes de la música electrónica. Decide si la informacion de "Event Info" es relevante para agregarla a la descripcion final.
  `, // Using Spanish as requested.
});

const generateMixDescriptionFlow = ai.defineFlow(
  {
    name: 'generateMixDescriptionFlow',
    inputSchema: GenerateMixDescriptionInputSchema,
    outputSchema: GenerateMixDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateMixDescriptionPrompt(input);
    return output!;
  }
);
