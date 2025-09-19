'use server';

import { filterTestimonialsForRelevance, type FilterTestimonialsInput } from '@/ai/flows/filter-testimonials-for-relevance';

/**
 * Filters testimonials for relevance to a given product using an AI flow.
 * @param input - The product and list of testimonials to filter.
 * @returns A promise that resolves to an array of relevant testimonials.
 */
export async function getRelevantTestimonials(input: FilterTestimonialsInput) {
    try {
        const result = await filterTestimonialsForRelevance(input);
        // Ensure we return an array even if the AI flow returns nothing
        return result.relevantTestimonials || [];
    } catch (error) {
        console.error("Error filtering testimonials:", error);
        // Return an empty array in case of an error to prevent breaking the client
        return [];
    }
}
