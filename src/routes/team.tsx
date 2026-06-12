import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/site/SiteLayout";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";

const TEAM = [
  {
    img: team1,
    name: "Ananya Sharma",
    role: "Lead Makeup Artist",
    exp: "8+ years",
    specialty: "Bridal & HD Airbrush Makeup",
  },
  {
    img: team2,
    name: "Rohan Verma",
    role: "Master Hair Stylist",
    exp: "10+ years",
    specialty: "Cuts, Balayage & Color",
  },
  {
    img: team3,
    name: "Pooja Iyer",
    role: "Senior Skin Therapist",
    exp: "6+ years",
    specialty: "Facials & Skin Treatments",
  },
  {
    img: avatar1,
    name: "Sneha Kapoor",
    role: "Nail Artist",
    exp: "5+ years",
    specialty: "Acrylics & Nail Art",
  },
  {
    img: avatar2,
    name: "Riya Singh",
    role: "Spa Therapist",
    exp: "7+ years",
    specialty: "Relaxation & Therapeutic Massage",
  },
];

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Expert Stylists & Beauty Artists | The Wow Factor" },
      {
        name: "description",
        content:
          "Meet the certified hair stylists, makeup artists and beauty experts behind The Wow Factor Unisex Salon in Indore.",
      },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our team"
        title="The artists behind the wow."
        subtitle="A passionate team of certified professionals dedicated to your beauty."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="overflow-hidden rounded-3xl bg-white shadow-card transition-transform hover:-translate-y-1"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="font-display text-xl">{m.name}</div>
                <div className="text-sm text-[var(--rose)]">{m.role}</div>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--peach)]/50 px-3 py-1 text-xs text-[var(--ink)]/70">
                  <Sparkles className="h-3 w-3" /> {m.exp}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{m.specialty}</p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--rose)]"
                >
                  <Instagram className="h-3.5 w-3.5" /> Follow
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <h3 className="font-display text-2xl">Want to book with a specific artist?</h3>
          <Link
            to="/appointments"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-[var(--rose)] px-6 py-3 text-sm font-semibold text-white"
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
