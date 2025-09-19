import { Wifi, Zap, Smartphone, Phone } from 'lucide-react';
import type { Product, Testimonial } from './types';

export const products: Product[] = [
  {
    id: 'data',
    title: 'Data Purchase',
    description: 'Instantly top up your mobile data. Fast, easy, and available for all major networks.',
    price: 'Starting from ₦100',
    icon: Wifi,
  },
  {
    id: 'airtime',
    title: 'Airtime Top-up',
    description: 'Never run out of credit. Recharge your phone or send airtime to others in a few clicks.',
    price: 'Flexible amounts',
    icon: Smartphone,
  },
  {
    id: 'electricity',
    title: 'Utility Payments',
    description: 'Pay your electricity bills seamlessly. Supports all major distribution companies.',
    price: 'Pay your bill',
    icon: Zap,
  },
  {
    id: 'cable',
    title: 'Cable TV Subscription',
    description: 'Renew your TV subscriptions for DSTV, GOtv, and more without any hassle.',
    price: 'Packages vary',
    icon: Phone, // Using Phone as a placeholder for a TV remote icon
  },
];

export const testimonials: Testimonial[] = [
  {
    text: "Niville's data purchase is incredibly fast! I got my 2GB in seconds. It's my go-to app now.",
    author: 'Jane D.',
    company: 'TechCorp',
    logoUrl: 'https://picsum.photos/seed/techcorp/40/40',
    product: 'Data Purchase',
  },
  {
    text: 'Paying my electricity bill has never been easier. The process is straightforward and I get my token instantly. Thanks, Niville!',
    author: 'John S.',
    company: 'InnovateInc',
    logoUrl: 'https://picsum.photos/seed/innovateinc/40/40',
    product: 'Utility Payments',
  },
  {
    text: 'I love this app, it is great for sending money to my friends and family abroad. The rates are very competitive.',
    author: 'Emily W.',
    company: 'Global Movers',
    logoUrl: 'https://picsum.photos/seed/globalmovers/40/40',
    product: 'Money Transfer',
  },
  {
    text: "Their airtime top-up service is a lifesaver for my business. I can easily manage credit for all my staff phones.",
    author: 'Michael B.',
    company: 'BizSolutions',
    logoUrl: 'https://picsum.photos/seed/bizsolutions/40/40',
    product: 'Airtime Top-up',
  },
  {
    text: 'good app',
    author: 'Anonymous',
    company: 'User',
    logoUrl: 'https://picsum.photos/seed/anonymous/40/40',
    product: 'General',
  },
  {
    text: 'Finally, an app where I can pay for my DSTV subscription without calling customer service. Five stars!',
    author: 'Chioma K.',
    company: 'HomeEntertain',
    logoUrl: 'https://picsum.photos/seed/homeentertain/40/40',
    product: 'Cable TV Subscription',
  },
];
