import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="h-56 bg-gradient-to-br from-primary to-purple-400 blur-[106px] dark:from-blue-700"></div>
        <div className="h-32 bg-gradient-to-r from-cyan-400 to-sky-300 blur-[106px] dark:to-indigo-600"></div>
      </div>
      <div className="container relative mx-auto max-w-7xl px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Seamless Payments, Instantly Delivered.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Experience the new standard in online transactions. Fast, secure, and
            reliable services for your data, airtime, and utility bills.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="#">
                Get Started Free
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="#">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
             <Image
                src="https://picsum.photos/seed/niville-hero/1200/800"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                data-ai-hint="technology abstract"
                priority
              />
          </div>
        </div>
      </div>
    </section>
  );
}
