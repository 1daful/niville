import { cn } from "@/lib/utils";
import { Wallet } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Wallet className="h-6 w-6 text-secondary" />
      <span className="text-xl font-bold tracking-tight text-foreground">
        Niville
      </span>
    </div>
  );
}
