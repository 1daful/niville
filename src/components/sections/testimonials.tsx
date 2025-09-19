import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestimonialsList } from "@/components/testimonials-list";

export function TestimonialsSection() {
  const productCategories = ["Data Purchase", "Utility Payments", "Airtime Top-up"];

  return (
    <section id="testimonials" className="py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by Innovators
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            See what our customers are saying about our services.
          </p>
        </div>

        <Tabs defaultValue={productCategories[0]} className="mt-16 w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            {productCategories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category.replace(' Purchase', '').replace(' Payments', '')}
              </TabsTrigger>
            ))}
          </TabsList>
          {productCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <TestimonialsList product={category} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
