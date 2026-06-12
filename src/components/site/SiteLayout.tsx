import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="gradient-rose">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8 md:py-24">
        {eyebrow && (
          <div className="mb-3 inline-block rounded-full bg-white/60 px-4 py-1 text-xs uppercase tracking-[0.2em] text-[var(--rose)]">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-4xl text-[var(--ink)] md:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
