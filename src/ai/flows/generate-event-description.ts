'use server';

/**
 * @fileOverview An AI agent for generating event descriptions for DJ gigs.
 *
 * - generateEventDescription - A function that generates an event description.
 * - GenerateEventDescriptionInput - The input type for the generateEventDescription function.
 * - GenerateEventDescriptionOutput - The return type for the generateEventDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventDescriptionInputSchema = z.object({
  eventName: z.string().describe('The name of the event.'),
  eventDate: z.string().describe('The date of the event (e.g., YYYY-MM-DD).'),
  eventTime: z.string().describe('The time of the event (e.g., HH:MM).'),
  eventLocation: z.string().describe('The location of the event.'),
  musicGenre: z.string().describe('The genre of music that will be played.'),
  djName: z.string().describe('The name of the DJ performing.'),
  additionalDetails: z
    .string()
    .optional()
    .describe('Any additional details about the event.'),
});
export type GenerateEventDescriptionInput = z.infer<typeof GenerateEventDescriptionInputSchema>;

const GenerateEventDescriptionOutputSchema = z.object({
  eventDescription: z
    .string()
    .describe('A captivating and engaging description of the event.'),
});
export type GenerateEventDescriptionOutput = z.infer<typeof GenerateEventDescriptionOutputSchema>;

export async function generateEventDescription(
  input: GenerateEventDescriptionInput
): Promise<GenerateEventDescriptionOutput> {
  return generateEventDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEventDescriptionPrompt',
  input: {schema: GenerateEventDescriptionInputSchema},
  output: {schema: GenerateEventDescriptionOutputSchema},
  prompt: `You are a creative copywriter specializing in crafting engaging event descriptions.

  Based on the information provided, create a compelling description for the DJ event.
  Consider highlighting the key aspects of the event to attract attendees.
  Incorporate details such as the event name, date, time, location, music genre,
  and DJ name to create an enticing narrative. Only incorporate the additional details if they are helpful for the description.

  Event Name: {{{eventName}}}
  Date: {{{eventDate}}}
  Time: {{{eventTime}}}
  Location: {{{eventLocation}}}
  Music Genre: {{{musicGenre}}}
  DJ Name: {{{djName}}}
  Additional Details: {{{additionalDetails}}}

  Write a description that will make people want to attend.
  Do not include any links, hashtags, or promotional jargon.
  Write in Spanish.
  `,
});

const generateEventDescriptionFlow = ai.defineFlow(
  {
    name: 'generateEventDescriptionFlow',
    inputSchema: GenerateEventDescriptionInputSchema,
    outputSchema: GenerateEventDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
