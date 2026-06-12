import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { PageHeader } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import serviceBridal from "@/assets/service-bridal.jpg";
import serviceSpa from "@/assets/service-spa.jpg";
import serviceHair from "@/assets/service-hair.jpg";
import serviceSkin from "@/assets/service-skin.jpg";
import serviceNails from "@/assets/service-nails.jpg";
import interior from "@/assets/interior.jpg";

const CATEGORIES = [
  "All",
  "Bridal Makeup",
  "Hair Transformations",
  "Skin Care",
  "Nail Art",
  "Salon Interior",
] as const;

const SEED: { url: string; category: (typeof CATEGORIES)[number] }[] = [
  { url: serviceBridal, category: "Bridal Makeup" },
  { url: gallery1, category: "Bridal Makeup" },
  { url: gallery2, category: "Hair Transformations" },
  { url: serviceHair, category: "Hair Transformations" },
  { url: gallery3, category: "Skin Care" },
  { url: serviceSkin, category: "Skin Care" },
  { url: gallery4, category: "Nail Art" },
  { url: serviceNails, category: "Nail Art" },
  { url: interior, category: "Salon Interior" },
  { url: serviceSpa, category: "Salon Interior" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Bridal Makeup, Hair & Nail Art | The Wow Factor" },
      {
        name: "description",
        content:
          "Explore our gallery of bridal makeup, hair transformations, skin care, nail art and salon interiors.",
      },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const { data } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const cloudItems = (data ?? []).map((g) => ({
    url: g.image_url,
    category: g.category as (typeof CATEGORIES)[number],
  }));
  const items = [...cloudItems, ...SEED];
  const visible = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="A glimpse of our craft."
        subtitle="Real work, real clients, real glow-ups from our Indore studio."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                active === c
                  ? "bg-[var(--rose)] text-white shadow-soft"
                  : "bg-white text-[var(--ink)]/70 shadow-card hover:text-[var(--rose)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="mt-12 grid place-items-center rounded-3xl bg-white p-16 text-center shadow-card">
            <ImageIcon className="h-10 w-10 text-[var(--rose)]/60" />
            <p className="mt-4 text-muted-foreground">No photos in this category yet.</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((g, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl shadow-card">
                <img
                  src={g.url}
                  alt={g.category}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
