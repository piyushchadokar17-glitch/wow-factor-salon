import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/salon";
import { PageHeader } from "@/components/site/SiteLayout";
import serviceBridal from "@/assets/service-bridal.jpg";
import serviceSpa from "@/assets/service-spa.jpg";
import serviceHair from "@/assets/service-hair.jpg";
import serviceSkin from "@/assets/service-skin.jpg";
import serviceNails from "@/assets/service-nails.jpg";

const CATEGORY_IMG: Record<string, string> = {
  hair: serviceHair,
  makeup: serviceBridal,
  skin: serviceSkin,
  nails: serviceNails,
  spa: serviceSpa,
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Hair, Makeup, Skin, Nails & Spa | Indore" },
      {
        name: "description",
        content:
          "Explore our full service menu: haircuts, balayage, bridal makeup, facials, acrylic nails, spa and more at Indore's premium unisex salon.",
      },
      { property: "og:title", content: "Salon Services in Indore" },
      { property: "og:description", content: "Hair, makeup, skin, nails and spa — all under one roof." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Service menu"
        title="Treatments crafted to make you glow."
        subtitle="From everyday care to once-in-a-lifetime bridal moments — explore our full menu."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        {SERVICE_CATEGORIES.map((cat, idx) => (
          <section key={cat.slug} id={cat.slug} className="py-10">
            <div
              className={`grid items-center gap-10 md:grid-cols-2 ${idx % 2 === 1 ? "md:[&>img]:order-2" : ""}`}
            >
              <img
                src={CATEGORY_IMG[cat.slug]}
                alt={cat.title}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card md:aspect-square"
              />
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--rose)]">
                  Category
                </div>
                <h2 className="mt-2 font-display text-4xl">{cat.title}</h2>
                <p className="mt-3 text-muted-foreground">{cat.description}</p>
                <ul className="mt-6 space-y-3">
                  {cat.items.map((it) => (
                    <li
                      key={it.name}
                      className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card"
                    >
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--peach)]/60 text-[var(--rose)]">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-[var(--ink)]">{it.name}</div>
                        <div className="text-sm text-muted-foreground">{it.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/appointments"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--rose)] px-5 py-3 text-sm font-semibold text-white shadow-soft"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
