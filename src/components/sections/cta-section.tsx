import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-white dark:bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="relative isolate overflow-hidden bg-secondary/80 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
           <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
            Ready to Simplify Your Payments?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-secondary-foreground/80">
            Join thousands of satisfied users who trust Niville for their daily transactions. Create your free account today and experience the difference.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="#">
                Create a Free Account
              </Link>
            </Button>
          </div>
            <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                aria-hidden="true"
            >
                <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
                <defs>
                <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                    <stop stopColor="#FF8A65" />
                    <stop offset={1} stopColor="#64B5F6" />
                </radialGradient>
                </defs>
            </svg>
        </div>
      </div>
    </section>
  );
}
