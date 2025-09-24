'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState, useEffect } from 'react';

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
import { useAuth } from '@/contexts/auth-context';
import { saveTransaction } from '@/lib/api';
import { useRouter } from 'next/navigation';

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
  onPaymentSuccess: () => void; // Callback to refresh dashboard data
}

export function PaymentModal({ product, isOpen, onClose, onPaymentSuccess }: PaymentModalProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

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
  
  async function onSubmit(data: PaymentFormValues) {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Not Logged In',
            description: 'You need to be signed in to make a payment.',
        });
        return router.push('/sign-in');
    }
    if (!product) return;

    setIsProcessing(true);
    try {
        await saveTransaction({
            title: product.title,
            identifier: data.identifier,
            amount: data.amount,
        });

        toast({
            title: 'Payment Successful!',
            description: `Your payment for ${product.title} was recorded.`,
        });
        onPaymentSuccess(); // Trigger data refresh on the dashboard
        onClose();
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Payment Failed',
            description: error.message || 'There was an issue processing your payment.',
        });
    } finally {
        setIsProcessing(false);
    }
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
            Complete the details below to make a payment.
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
            <Button type="submit" className={cn('w-full')} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Pay ₦${form.watch('amount')}`}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
