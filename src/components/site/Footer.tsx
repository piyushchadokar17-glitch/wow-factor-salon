import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Clock, Mail } from "lucide-react";
import { BUSINESS } from "@/lib/salon";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--rose)]/15 bg-gradient-to-b from-white to-[var(--cream)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--lavender)] font-display text-xl text-white">
              W
            </div>
            <div className="font-display text-lg">The Wow Factor</div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Indore's premium unisex salon for hair, makeup, skin, nails & spa.
            Enhancing beauty, inspiring confidence.
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href={BUSINESS.instagram}
              className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-card text-[var(--rose)]"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={BUSINESS.facebook}
              className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-card text-[var(--rose)]"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ink)]">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-[var(--rose)]">About Us</Link></li>
            <li><Link to="/services" className="hover:text-[var(--rose)]">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-[var(--rose)]">Gallery</Link></li>
            <li><Link to="/team" className="hover:text-[var(--rose)]">Our Team</Link></li>
            <li><Link to="/testimonials" className="hover:text-[var(--rose)]">Reviews</Link></li>
            <li><Link to="/appointments" className="hover:text-[var(--rose)]">Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ink)]">
            Services
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Bridal & Party Makeup</li>
            <li>Hair Styling & Balayage</li>
            <li>Facials & Skin Care</li>
            <li>Acrylic Nails & Pedicure</li>
            <li>Spa & Wellness</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--ink)]">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--rose)]" />
              <span>{BUSINESS.address.line1}, {BUSINESS.address.line2}</span>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-[var(--rose)]" />
              <a href={`tel:${BUSINESS.phoneRaw}`}>{BUSINESS.phone}</a>
            </li>
            <li className="flex gap-2">
              <Clock className="h-4 w-4 shrink-0 text-[var(--rose)]" />
              <span>{BUSINESS.hours}</span>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0 text-[var(--rose)]" />
              <Link to="/contact" className="hover:text-[var(--rose)]">Send a message</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--rose)]/15 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} The Wow Factor Unisex Salon. All rights reserved.
      </div>
    </footer>
  );
}
