'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { getRelevantTestimonials } from '@/app/actions';
import { testimonials as allTestimonialsData } from '@/lib/data';
import type { Testimonial } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from './ui/skeleton';

interface TestimonialsListProps {
  product: string;
}

export function TestimonialsList({ product }: TestimonialsListProps) {
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Memoize the initial testimonials to prevent re-filtering on every render
  const allTestimonials = useMemo(() => allTestimonialsData, []);

  useEffect(() => {
    const fetchAndFilterTestimonials = async () => {
      setLoading(true);
      try {
        // Prepare data for AI flow (omitting fields not in the schema)
        const testimonialsForAI = allTestimonials.map(({ text, author, product }) => ({
          text,
          author,
          product,
        }));

        const relevantFromAI = await getRelevantTestimonials({
          testimonials: testimonialsForAI,
          product: product,
        });
        
        // Map AI results back to full testimonial data to get logos and company names
        const fullTestimonials = relevantFromAI
          .map((aiTestimonial) => {
            return allTestimonials.find(
              (t) => t.text === aiTestimonial.text && t.author === aiTestimonial.author
            );
          })
          .filter((t): t is Testimonial => !!t); // Type guard to filter out undefined

        setFilteredTestimonials(fullTestimonials);
      } catch (error) {
        console.error('Failed to load testimonials:', error);
        setFilteredTestimonials([]); // Clear testimonials on error
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterTestimonials();
  }, [product, allTestimonials]);

  if (loading) {
    return (
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }
  
  if (filteredTestimonials.length === 0) {
    return (
        <div className="text-center py-12 text-muted-foreground">
            <p>No relevant testimonials for this product at the moment.</p>
        </div>
    )
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {filteredTestimonials.map((testimonial, index) => (
        <Card key={index} className="break-inside-avoid">
          <CardContent className="pt-6">
            <blockquote className="text-foreground">
              "{testimonial.text}"
            </blockquote>
          </CardContent>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={testimonial.logoUrl} alt={testimonial.company} data-ai-hint="logo abstract" />
                <AvatarFallback>{testimonial.company.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
