import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Star,
  Sparkles,
  Award,
  Users,
  Heart,
  ArrowRight,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import serviceBridal from "@/assets/service-bridal.jpg";
import serviceSpa from "@/assets/service-spa.jpg";
import serviceHair from "@/assets/service-hair.jpg";
import serviceNails from "@/assets/service-nails.jpg";
import { BUSINESS, WHATSAPP_LINK } from "@/lib/salon";
import { db } from "@/lib/db";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Wow Factor Unisex Salon — Best Luxury Salon in Indore" },
      {
        name: "description",
        content:
          "Indore's premium unisex salon — bridal & party makeup, hair, facials, spa & nails. 4.9★ rated by 1.4K+ clients in Nipania, Indore.",
      },
      { property: "og:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedServices />
      <AboutPreview />
      <GalleryPreview />
      <TestimonialsPreview />
      <CTA />
      <ContactPreview />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-rose" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-12 md:px-8 md:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[var(--rose)]">
            <Sparkles className="h-3.5 w-3.5" /> Premium Salon • Nipania, Indore
          </div>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-[var(--ink)] md:text-7xl">
            Where Beauty
            <br />
            <span className="text-[var(--rose)]">Meets Confidence</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
            Indore's most loved luxury salon for bridal makeup, hair styling, skin
            therapy, nails and spa. Rated{" "}
            <span className="font-semibold text-[var(--ink)]">{BUSINESS.rating}★</span>{" "}
            by {BUSINESS.reviews} clients.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/appointments"
              className="rounded-full bg-[var(--rose)] px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03]"
            >
              Book Appointment
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--rose)]/30 bg-white/70 px-6 py-3 text-sm font-semibold text-[var(--rose)]"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-[var(--rose)] text-[var(--rose)]" />
              ))}
            </div>
            <span>{BUSINESS.rating}★ on Google • {BUSINESS.reviews} reviews</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-white/60 to-[var(--lavender)]/40 blur-2xl" />
          <img
            src={hero}
            alt="Luxury beauty salon model in Indore"
            className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-soft"
            width={1024}
            height={1280}
          />
          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl glass p-4 shadow-card md:left-auto md:right-5 md:w-64">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Most loved
            </div>
            <div className="font-display text-lg">Signature Bridal Glam</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { icon: Star, label: "Google Rating", value: `${BUSINESS.rating}★` },
    { icon: Users, label: "Happy Clients", value: BUSINESS.reviews },
    { icon: Award, label: "Years of Glow", value: "10+" },
    { icon: Heart, label: "Bridal Brides", value: "500+" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="grid grid-cols-2 gap-3 rounded-3xl bg-white p-4 shadow-card md:grid-cols-4 md:gap-6 md:p-8">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--peach)]/60 text-[var(--rose)]">
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-2xl text-[var(--ink)]">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedServices() {
  const cards = [
    { img: serviceBridal, title: "Bridal Makeup", desc: "Signature looks for your big day" },
    { img: serviceHair, title: "Hair Styling", desc: "Cuts, color & balayage" },
    { img: serviceSpa, title: "Spa & Wellness", desc: "Unwind in pure luxury" },
    { img: serviceNails, title: "Nails & Mani", desc: "Acrylics, pedicure & art" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <SectionHeader
        eyebrow="What we do"
        title="Featured Services"
        subtitle="A curated menu of treatments delivered by trained beauty experts."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.title}
            to="/services"
            className="group overflow-hidden rounded-3xl bg-white shadow-card transition-transform hover:-translate-y-1"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="font-display text-lg">{c.title}</div>
              <div className="text-xs text-muted-foreground">{c.desc}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--rose)]"
        >
          View all services <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <img
          src={about}
          alt="Inside The Wow Factor salon"
          loading="lazy"
          className="aspect-[4/5] rounded-3xl object-cover shadow-card md:aspect-square"
        />
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--rose)]">
            About us
          </div>
          <h2 className="mt-2 font-display text-4xl">A salon designed around you.</h2>
          <p className="mt-4 text-muted-foreground">
            At The Wow Factor, every guest is treated to a personalised beauty
            experience in a serene, hygienic setting. Our certified artists use
            premium professional products to bring out your most radiant self.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--rose)]"
          >
            Learn more about us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const imgs = [gallery1, gallery2, gallery3, gallery4];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <SectionHeader
        eyebrow="Our work"
        title="Gallery"
        subtitle="A glimpse of recent transformations from our studio."
      />
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {imgs.map((g, i) => (
          <div key={i} className="overflow-hidden rounded-2xl shadow-card">
            <img
              src={g}
              alt={`Salon work ${i + 1}`}
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/gallery" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--rose)]">
          See full gallery <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function TestimonialsPreview() {
  const { data } = useQuery({
    queryKey: ["reviews", "preview"],
    queryFn: async () => {
      const { data } = await db
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      return (data ?? []) as Array<{ id: string; customer_name: string; rating: number; review: string }>;
    },
  });
  return (
    <section className="gradient-rose mt-4">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <SectionHeader
          eyebrow="Loved by clients"
          title="What clients say"
          subtitle={`${BUSINESS.rating}★ rated by ${BUSINESS.reviews} happy clients`}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {(data ?? []).map((r) => (
            <div key={r.id} className="rounded-3xl glass p-6 shadow-card">
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[var(--rose)] text-[var(--rose)]" />
                ))}
              </div>
              <p className="mt-3 text-sm text-[var(--ink)]/80">"{r.review}"</p>
              <div className="mt-4 font-display text-base">— {r.customer_name}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/testimonials" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--rose)]">
            Read all reviews <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--rose)] to-[var(--lavender)] p-10 text-center text-white shadow-soft md:p-16">
        <h2 className="font-display text-3xl md:text-5xl">Ready to feel beautiful?</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Book your appointment now and let our experts pamper you.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/appointments"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--rose)]"
          >
            Book Appointment
          </Link>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--rose)]">Visit us</div>
          <h2 className="mt-2 font-display text-4xl">Come say hello.</h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 text-[var(--rose)]" />
              <span>{BUSINESS.address.line1},<br />{BUSINESS.address.line2}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 h-5 w-5 text-[var(--rose)]" />
              <a href={`tel:${BUSINESS.phoneRaw}`}>{BUSINESS.phone}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-1 h-5 w-5 text-[var(--rose)]" />
              <span>{BUSINESS.hours}</span>
            </li>
          </ul>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--rose)]"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-card">
          <iframe
            title="Map"
            src={BUSINESS.mapEmbed}
            className="h-72 w-full md:h-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.2em] text-[var(--rose)]">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-2 font-display text-4xl md:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
