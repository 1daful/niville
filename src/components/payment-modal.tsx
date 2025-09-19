'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const paymentFormSchema = z.object({
  identifier: z.string().min(10, {
    message: 'Please enter a valid phone number or meter number.',
  }),
  amount: z.coerce.number().min(100, {
    message: 'Amount must be at least ₦100.',
  }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ product, isOpen, onClose }: PaymentModalProps) {
  const { toast } = useToast();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      identifier: '',
      amount: 100,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset();
    }
  }, [product, form]);
  
  function onSubmit(data: PaymentFormValues) {
    console.log('Payment submitted', data);
    toast({
      title: 'Payment Successful!',
      description: `Your payment for ${product?.title} was processed.`,
    });
    onClose();
  }

  const getIdentifierLabel = () => {
    if (!product) return 'Identifier';
    if (product.id === 'data' || product.id === 'airtime') return 'Phone Number';
    if (product.id === 'electricity') return 'Meter Number';
    return 'Account Number';
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pay for {product?.title}</DialogTitle>
          <DialogDescription>
            Complete the details below to make a payment. This is a simulation.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getIdentifierLabel()}</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 08012345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₦)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={cn('w-full')}>Pay ₦{form.watch('amount')}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
