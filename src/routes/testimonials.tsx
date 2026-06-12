import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Star, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHeader } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Reviews & Testimonials — The Wow Factor Salon, Indore" },
      {
        name: "description",
        content:
          "Read 1,400+ five-star reviews from our happy clients in Indore — and share your own salon experience.",
      },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

const schema = z.object({
  customer_name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  rating: z.number().int().min(1).max(5),
  review: z.string().trim().min(10, "Review must be at least 10 characters").max(1000),
});

function TestimonialsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const [form, setForm] = useState({ customer_name: "", rating: 5, review: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert(parsed.data);
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit review. Please try again.");
      return;
    }
    toast.success("Thanks for your review!");
    setForm({ customer_name: "", rating: 5, review: "" });
    qc.invalidateQueries({ queryKey: ["reviews"] });
    qc.invalidateQueries({ queryKey: ["reviews", "preview"] });
  };

  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title="Loved by our clients."
        subtitle="4.9★ rated by 1,400+ happy clients across Indore."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-44 rounded-3xl bg-white/60 shadow-card animate-pulse" />
            ))}
          </div>
        ) : (data ?? []).length === 0 ? (
          <div className="grid place-items-center rounded-3xl bg-white p-16 text-center shadow-card">
            <MessageCircle className="h-10 w-10 text-[var(--rose)]/60" />
            <p className="mt-4 text-muted-foreground">Be the first to leave a review!</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(data ?? []).map((r) => (
              <div key={r.id} className="rounded-3xl bg-white p-6 shadow-card">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--rose)] text-[var(--rose)]" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-[var(--ink)]/80">"{r.review}"</p>
                <div className="mt-4 font-display text-base">— {r.customer_name}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-2xl px-4 py-12 md:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-card">
          <h3 className="font-display text-2xl">Share your experience</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We'd love to hear how your visit went.
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <input
              required
              placeholder="Your name"
              value={form.customer_name}
              onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
              className="w-full rounded-2xl border border-[var(--rose)]/20 bg-[var(--cream)] px-4 py-3 text-sm outline-none focus:border-[var(--rose)]"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rating:</span>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  className="p-1"
                  aria-label={`${n} stars`}
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      n <= form.rating
                        ? "fill-[var(--rose)] text-[var(--rose)]"
                        : "text-[var(--ink)]/20"
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              required
              rows={4}
              placeholder="Write your review…"
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              className="w-full rounded-2xl border border-[var(--rose)]/20 bg-[var(--cream)] px-4 py-3 text-sm outline-none focus:border-[var(--rose)]"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-[var(--rose)] px-6 py-3 text-sm font-semibold text-white shadow-soft disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Post Review"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
