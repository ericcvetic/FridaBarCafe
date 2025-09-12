import { AudioLines } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-3">
          <AudioLines className="h-6 w-6 md:h-7 md:w-7 text-primary" />
          <h1 className="text-xl md:text-2xl font-bold text-foreground font-headline tracking-tight">
            VozActiva
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
