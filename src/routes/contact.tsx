import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Clock, MessageCircle, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHeader } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { BUSINESS, WHATSAPP_LINK } from "@/lib/salon";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — The Wow Factor Unisex Salon, Indore" },
      {
        name: "description",
        content:
          "Get in touch with The Wow Factor Salon. Visit us in Nipania, Indore, call +91 79052 93466 or send a message.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  mobile: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      ...parsed.data,
      mobile: parsed.data.mobile || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send message. Please try again.");
      return;
    }
    toast.success("Message sent! We'll reply soon.");
    setForm({ name: "", email: "", mobile: "", message: "" });
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We'd love to hear from you."
        subtitle="Visit our studio, send a message, or chat on WhatsApp."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {[
              { icon: MapPin, label: "Address", value: `${BUSINESS.address.line1}, ${BUSINESS.address.line2}` },
              { icon: Phone, label: "Phone", value: BUSINESS.phone, href: `tel:${BUSINESS.phoneRaw}` },
              { icon: Clock, label: "Hours", value: BUSINESS.hours },
              { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: WHATSAPP_LINK },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href || "#"}
                target={c.href?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-start gap-4 rounded-3xl bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--peach)]/60 text-[var(--rose)]">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="mt-0.5 font-medium text-[var(--ink)]">{c.value}</div>
                </div>
              </a>
            ))}
            <div className="overflow-hidden rounded-3xl shadow-card">
              <iframe
                title="Google Map"
                src={BUSINESS.mapEmbed}
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl bg-white p-6 shadow-card md:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--rose)]/10 text-[var(--rose)]">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl">Send a message</h3>
            </div>
            <div className="mt-6 space-y-4">
              <input
                required
                placeholder="Full name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
              />
              <input
                required
                type="email"
                placeholder="Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputCls}
              />
              <input
                placeholder="Mobile (optional)"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className={inputCls}
              />
              <textarea
                required
                rows={5}
                placeholder="Your message *"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputCls}
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--rose)] px-6 py-3 text-sm font-semibold text-white shadow-soft disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-2xl border border-[var(--rose)]/20 bg-[var(--cream)] px-4 py-3 text-sm outline-none focus:border-[var(--rose)]";
