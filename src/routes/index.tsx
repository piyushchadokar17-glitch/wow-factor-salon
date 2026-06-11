import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  Phone,
  Scissors,
  Sparkles,
  Heart,
  Hand,
  Flower2,
  Star,
  Users,
  Award,
  Droplets,
  Package,
  MapPin,
  MessageCircle,
  ArrowRight,
  Instagram,
  Facebook,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import serviceBridal from "@/assets/service-bridal.jpg";
import serviceSpa from "@/assets/service-spa.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Wow Factor Unisex Salon — Hair, Makeup & Spa" },
      { name: "description", content: "Premium unisex salon — hair styling, bridal & party makeup, facials, manicure, spa & massage. Enhancing Beauty, Inspiring Confidence." },
      { property: "og:title", content: "The Wow Factor Unisex Salon" },
      { property: "og:description", content: "Enhancing Beauty, Inspiring Confidence." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Home,
});

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { icon: Scissors, title: "Hair Styling", desc: "Precision cuts and editorial styling for any occasion." },
  { icon: Sparkles, title: "Bridal Makeup", desc: "Luxe transformations for your most precious day." },
  { icon: Heart, title: "Party Makeup", desc: "Statement looks for every celebration." },
  { icon: Flower2, title: "Facials", desc: "Bespoke skincare treatments for a radiant glow." },
  { icon: Droplets, title: "Skin Care", desc: "Clinical-grade treatments with a holistic touch." },
  { icon: Hand, title: "Mani & Pedi", desc: "Luxury nail care and therapeutic hand treatments." },
  { icon: Sparkles, title: "Haircut", desc: "Tailored cuts for men and women by master stylists." },
  { icon: Flower2, title: "Spa & Massage", desc: "A sensory journey to deep relaxation and tranquility." },
];

const stats = [
  { icon: Star, value: "4.9★ Rating", label: "Verified Excellence" },
  { icon: Users, value: "1.4K+ Happy", label: "Loyal Clientele" },
  { icon: Award, value: "Experts", label: "Certified Artists" },
  { icon: Droplets, value: "Hygienic", label: "Pure Environment" },
  { icon: Package, value: "Premium", label: "Global Products" },
];

const gallery = [
  { src: gallery1, alt: "Bridal makeup look" },
  { src: gallery2, alt: "Hair transformation" },
  { src: gallery3, alt: "Salon interior" },
  { src: gallery4, alt: "Facial spa treatment" },
];

const testimonials = [
  {
    quote: "The most incredible experience I've ever had at a salon. The atmosphere is so calming and my stylist truly understood what I wanted. I left feeling like a brand new version of myself.",
    name: "Sarah Jenkins",
    role: "Bridal Client",
    avatar: avatar1,
  },
  {
    quote: "I've been to many luxury salons around the world, and The Wow Factor stands out for its attention to detail and hygienic standards. Their facials are purely divine.",
    name: "Elena Rodriguez",
    role: "Skincare Enthusiast",
    avatar: avatar2,
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#home" className="font-display text-xl font-semibold text-primary md:text-2xl">
          The Wow Factor
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Book Appointment
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl shadow-card">
          <img src={hero} alt="The Wow Factor luxury salon" className="h-[78vh] min-h-[560px] w-full object-cover" width={1536} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl px-8 md:px-14">
              <span className="inline-flex items-center rounded-full bg-rose-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                Experience Luxury
              </span>
              <h1 className="mt-5 font-display text-5xl leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
                The Wow Factor<br />Unisex Salon
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/75 md:text-lg">
                Enhancing Beauty, Inspiring Confidence. Immerse yourself in a transformative,
                indulgent experience that feels both exclusive and effortlessly seamless.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5">
                  <Calendar className="h-4 w-4" /> Book Appointment
                </a>
                <a href="tel:+12345678900" className="inline-flex items-center gap-2 rounded-full bg-white/70 px-7 py-3.5 font-medium text-primary backdrop-blur transition-colors hover:bg-white">
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-6 py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl shadow-card">
          <img src={about} alt="Master stylist at work" className="h-full w-full object-cover" width={1024} height={1280} loading="lazy" />
        </div>
        <div>
          <h2 className="font-display text-4xl text-primary md:text-5xl">Crafted for Excellence</h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/75">
            At The Wow Factor, we believe beauty is more than skin deep — it's a reflection of your
            inner confidence. Founded on the principles of soft luxury, our salon provides a
            sanctuary where modern aesthetics meet traditional hospitality.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/75">
            Our team of expert stylists and therapists are dedicated to providing a personalized
            journey for every guest. From the moment you step through our doors, you are treated to
            an atmosphere of tranquility, cleanliness, and superior quality.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-secondary p-6">
              <div className="font-display text-4xl text-primary">10+</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-foreground/70">Years Excellence</div>
            </div>
            <div className="rounded-2xl bg-secondary p-6">
              <div className="font-display text-4xl text-primary">25+</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-foreground/70">Expert Stylists</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative px-6 py-24 lg:px-10">
      <div className="absolute inset-0 -z-10 gradient-rose opacity-50" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl md:text-5xl">Curated Services</h2>
          <p className="mt-4 text-foreground/70">
            Discover our range of premium treatments designed to rejuvenate your body and spirit.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="group relative col-span-1 row-span-2 overflow-hidden rounded-3xl shadow-card lg:row-span-2">
            <img src={serviceBridal} alt="Bridal makeup" className="h-full min-h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105" width={1280} height={896} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span className="inline-flex rounded-full bg-white/25 px-3 py-1 text-xs font-semibold backdrop-blur">Premium Service</span>
              <h3 className="mt-3 font-display text-3xl">Bridal &amp; Party Makeup</h3>
              <p className="mt-2 max-w-sm text-sm text-white/85">Luxe transformations for your most precious moments.</p>
            </div>
          </div>

          {services.slice(0, 4).map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}

          <div className="group relative overflow-hidden rounded-3xl shadow-card md:col-span-2 lg:col-span-1">
            <img src={serviceSpa} alt="Spa treatment" className="h-full min-h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-105" width={1024} height={1024} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="font-display text-2xl">Spa &amp; Massage</h3>
              <p className="mt-1 text-sm text-white/85">A sensory journey to deep relaxation in our aromatherapy suites.</p>
              <a href="#contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium">
                Explore Therapy <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {services.slice(4).map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, title, desc }: { icon: typeof Scissors; title: string; desc: string }) {
  return (
    <div className="group rounded-3xl bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">{desc}</p>
    </div>
  );
}

function WhyUs() {
  return (
    <section className="px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-4xl md:text-5xl">Why Choose Us</h2>
          <p className="mt-3 text-foreground/70">Trusted by a community that values true craftsmanship.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl bg-card p-6 text-center shadow-card transition-transform hover:-translate-y-1">
              <s.icon className="mx-auto h-7 w-7 text-primary" />
              <div className="mt-3 font-display text-xl text-foreground md:text-2xl">{s.value}</div>
              <div className="mt-1 text-xs text-foreground/65">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="bg-secondary/60 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Studio Gallery</h2>
            <p className="mt-2 text-foreground/70">A glimpse into our world of transformation.</p>
          </div>
          <a href="https://instagram.com" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <Instagram className="h-4 w-4" /> Follow @TheWowFactor
          </a>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card">
              <img src={g.src} alt={g.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" width={900} height={1152} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative px-6 py-24 lg:px-10">
      <div className="absolute inset-0 -z-10 gradient-rose opacity-40" />
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-display text-4xl md:text-5xl">Client Experiences</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-3xl bg-card/90 p-8 shadow-card backdrop-blur">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 text-base italic leading-relaxed text-foreground/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" width={48} height={48} loading="lazy" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs font-medium uppercase tracking-wider text-foreground/60">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl md:text-5xl">Visit The Salon</h2>
          <p className="mt-3 max-w-md text-foreground/70">
            Walk-ins are welcome, but appointments are encouraged for a curated experience.
          </p>
          <div className="mt-8 space-y-5">
            <ContactRow icon={MapPin} label="Address" value="123 Luxe Boulevard, Elegance Square, City" />
            <ContactRow icon={Phone} label="Phone" value="+1 (234) 567 890" href="tel:+12345678900" />
            <ContactRow icon={MessageCircle} label="WhatsApp" value="Chat with us instantly" href="https://wa.me/12345678900" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://wa.me/12345678900" className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.72_0.18_150)] px-6 py-3 font-medium text-white shadow-soft transition-transform hover:-translate-y-0.5">
              <MessageCircle className="h-4 w-4" /> WhatsApp Now
            </a>
            <a href="tel:+12345678900" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5">
              <Calendar className="h-4 w-4" /> Book Appointment
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-card">
          <iframe
            title="Salon location"
            src="https://www.google.com/maps?q=Times+Square+New+York&output=embed"
            className="h-full min-h-[360px] w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof MapPin; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-soft text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-foreground/60">{label}</div>
        <div className="mt-0.5 text-foreground">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block transition-opacity hover:opacity-80">{content}</a> : content;
}

function Footer() {
  return (
    <footer className="bg-secondary/80 px-6 pb-10 pt-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-xl text-primary">The Wow Factor</div>
          <p className="mt-3 max-w-xs text-sm text-foreground/70">
            Crafted for Excellence. Dedicated to providing a sanctuary of beauty and confidence for everyone.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card text-primary shadow-card transition-transform hover:-translate-y-0.5">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card text-primary shadow-card transition-transform hover:-translate-y-0.5">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Explore</div>
          <ul className="mt-4 space-y-2 text-sm text-foreground/75">
            <li><a href="#about" className="hover:text-primary">About</a></li>
            <li><a href="#services" className="hover:text-primary">Services</a></li>
            <li><a href="#gallery" className="hover:text-primary">Gallery</a></li>
            <li><a href="#contact" className="hover:text-primary">Booking Policy</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-foreground/75">
            <li>123 Luxe Boulevard, Elegance Square</li>
            <li>+1 (234) 567 890</li>
            <li>hello@thewowfactor.com</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-border pt-6 text-center text-xs text-foreground/55">
        © {new Date().getFullYear()} The Wow Factor Unisex Salon. All rights reserved.
      </div>
    </footer>
  );
}
