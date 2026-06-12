import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { BUSINESS } from "@/lib/salon";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/team", label: "Team" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--lavender)] text-white font-display text-xl shadow-sm">
            W
          </div>
          <div className="leading-tight">
            <div className="font-display text-base text-[var(--ink)] md:text-lg">
              The Wow Factor
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Unisex Salon • Indore
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-[var(--rose)]" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-[var(--ink)]/80 transition-colors hover:text-[var(--rose)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--rose)]/30 px-3 py-2 text-xs font-medium text-[var(--rose)] hover:bg-[var(--rose)]/5"
          >
            <Phone className="h-3.5 w-3.5" /> {BUSINESS.phone}
          </a>
          <Link
            to="/appointments"
            className="inline-flex items-center rounded-full bg-[var(--rose)] px-4 py-2 text-xs font-semibold text-white shadow-soft transition-transform hover:scale-[1.03]"
          >
            Book Appointment
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-[var(--ink)] lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="mx-4 mb-4 rounded-2xl bg-white p-4 shadow-card">
            <div className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-[var(--rose)]" }}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--ink)]/80"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/appointments"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--rose)] px-4 py-3 text-sm font-semibold text-white"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
