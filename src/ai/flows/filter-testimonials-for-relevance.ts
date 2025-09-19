// The directive tells the Next.js runtime that the code in this file should be executed on the server-side.
'use server';

/**
 * @fileOverview AI-powered testimonial filter for relevance.
 *
 * - filterTestimonialsForRelevance - Filters testimonials based on relevance to product and trustworthiness.
 * - FilterTestimonialsInput - The input type for the filterTestimonialsForRelevance function.
 * - FilterTestimonialsOutput - The return type for the filterTestimonialsForRelevance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TestimonialSchema = z.object({
  text: z.string().describe('The text of the testimonial.'),
  author: z.string().describe('The author of the testimonial.'),
  product: z.string().describe('The product or service the testimonial is about.'),
  trustworthinessScore: z.number().optional().describe('A score indicating how trustworthy the testimonial is, from 0 to 1.'),
});

const FilterTestimonialsInputSchema = z.object({
  testimonials: z.array(TestimonialSchema).describe('An array of testimonials to filter.'),
  product: z.string().describe('The product or service the user is currently viewing.'),
});
export type FilterTestimonialsInput = z.infer<typeof FilterTestimonialsInputSchema>;

const FilterTestimonialsOutputSchema = z.object({
  relevantTestimonials: z.array(TestimonialSchema).describe('An array of testimonials that are relevant and trustworthy for the specified product.'),
});
export type FilterTestimonialsOutput = z.infer<typeof FilterTestimonialsOutputSchema>;

export async function filterTestimonialsForRelevance(input: FilterTestimonialsInput): Promise<FilterTestimonialsOutput> {
  return filterTestimonialsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'filterTestimonialsPrompt',
  input: {
    schema: FilterTestimonialsInputSchema,
  },
  output: {
    schema: FilterTestimonialsOutputSchema,
  },
  prompt: `You are an AI assistant that filters customer testimonials for a landing page.

You will be provided with a list of testimonials and the product the user is currently viewing. Your task is to determine which testimonials are both relevant to the product and trustworthy.

Consider a testimonial trustworthy if it sounds genuine and provides specific details. Consider it relevant if it mentions the product specifically or discusses a similar product.

Here's the product the user is viewing: {{{product}}}

Here are the testimonials:
{{#each testimonials}}
  - Text: {{{text}}}, Author: {{{author}}}, Product: {{{product}}}
{{/each}}

Return only the testimonials that are both relevant and trustworthy.
`,
});

const filterTestimonialsFlow = ai.defineFlow(
  {
    name: 'filterTestimonialsFlow',
    inputSchema: FilterTestimonialsInputSchema,
    outputSchema: FilterTestimonialsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
