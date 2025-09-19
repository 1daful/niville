import type { LucideIcon } from "lucide-react";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: LucideIcon;
}

export interface Testimonial {
  text: string;
  author: string;
  company: string;
  logoUrl: string;
  product: string;
}
