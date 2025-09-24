'use client';

import { useState } from 'react';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentModal } from '@/components/payment-modal';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleBuyNow = (product: Product) => {
    if (!user) {
      router.push('/sign-in');
    } else {
      setSelectedProduct(product);
    }
  };

  const handlePaymentSuccess = () => {
    // For now, we just close the modal.
    // If the dashboard was on this page, we might want to refresh it.
    console.log('Payment was successful, data should refresh if visible.');
  };

  return (
    <>
      <section id="products" className="py-16 sm:py-24 bg-white dark:bg-card">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              All Your Payments in One Place
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              From data and airtime to electricity bills, handle all your essential payments with ease.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex-row items-center gap-4 pb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                     <product.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{product.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-sm font-semibold">{product.price}</span>
                  <Button variant="secondary" size="sm" onClick={() => handleBuyNow(product)}>
                    Pay Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <PaymentModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
}
