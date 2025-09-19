import Link from "next/link";
import { Logo } from "@/components/logo";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {currentYear} Niville Inc. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" target="_blank" rel="noreferrer">
            <div className="rounded-full border p-2 hover:bg-accent">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
          <Link href="#" target="_blank" rel="noreferrer">
            <div className="rounded-full border p-2 hover:bg-accent">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link href="#" target="_blank" rel="noreferrer">
            <div className="rounded-full border p-2 hover:bg-accent">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
}
