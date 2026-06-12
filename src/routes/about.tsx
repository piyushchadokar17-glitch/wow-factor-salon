import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Heart, Award, Leaf, ShieldCheck, Gem } from "lucide-react";
import about from "@/assets/about.jpg";
import interior from "@/assets/interior.jpg";
import { PageHeader } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — The Wow Factor Unisex Salon, Indore" },
      {
        name: "description",
        content:
          "Learn about Indore's premium unisex salon — our story, mission, vision and why thousands of clients trust us with their beauty.",
      },
      { property: "og:title", content: "About The Wow Factor Salon" },
      { property: "og:description", content: "Our story, mission and why we love what we do." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A salon built on care, craft & confidence."
        subtitle="Our team blends artistry with hospitality to create beauty experiences you'll remember."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img
            src={about}
            alt="Inside The Wow Factor salon"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card"
          />
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--rose)]">Our story</div>
            <h2 className="mt-2 font-display text-4xl">Born from a love for beauty.</h2>
            <p className="mt-4 text-muted-foreground">
              The Wow Factor Unisex Salon was founded with a simple promise — make every
              guest feel beautiful, confident and cared for. From the moment you walk in,
              you're welcomed into a calming, premium space where every detail is
              thoughtfully designed.
            </p>
            <p className="mt-3 text-muted-foreground">
              Today, we're proudly rated 4.9★ by 1,400+ clients across Indore and continue
              to be the go-to studio for brides, professionals and beauty lovers.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--peach)]/60 text-[var(--rose)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-2xl">Our mission</h3>
            <p className="mt-2 text-muted-foreground">
              Deliver world-class beauty services in a hygienic, welcoming space — using
              premium products and the latest techniques.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--lavender)]/40 text-[var(--rose)]">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-2xl">Our vision</h3>
            <p className="mt-2 text-muted-foreground">
              To be Indore's most loved beauty destination — known for the craft of our
              artists and the warmth of our hospitality.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--rose)]">Why choose us</div>
          <h2 className="mt-2 font-display text-4xl">The Wow Factor difference</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Award, t: "Expert Stylists", d: "Trained, certified & passionate." },
            { icon: Gem, t: "Premium Products", d: "Only the best for your hair and skin." },
            { icon: ShieldCheck, t: "Hygienic Setup", d: "Sanitised tools, single-use kits." },
            { icon: Leaf, t: "Calming Vibe", d: "An oasis to relax and unwind." },
          ].map((f) => (
            <div key={f.t} className="rounded-3xl bg-white p-6 shadow-card">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--peach)]/60 text-[var(--rose)]">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-display text-lg">{f.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <img
          src={interior}
          alt="The Wow Factor salon interior"
          loading="lazy"
          className="w-full rounded-3xl object-cover shadow-card"
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
        <h2 className="font-display text-3xl md:text-4xl">Meet the team behind the magic</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Our hair stylists, makeup artists and beauty therapists are here to bring your
          vision to life.
        </p>
        <Link
          to="/team"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--rose)] px-6 py-3 text-sm font-semibold text-white"
        >
          Meet our team
        </Link>
      </section>
    </>
  );
}
