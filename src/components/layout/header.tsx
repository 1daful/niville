import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="secondary" asChild>
            <Link href="#">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="#">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
