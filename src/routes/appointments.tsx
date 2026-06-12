import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHeader } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { ALL_SERVICES, WHATSAPP_LINK } from "@/lib/salon";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — The Wow Factor Salon, Indore" },
      {
        name: "description",
        content:
          "Book your salon appointment online — bridal makeup, hair, facials, nails, spa & more at Indore's 4.9★ rated salon.",
      },
    ],
    links: [{ rel: "canonical", href: "/appointments" }],
  }),
  component: AppointmentsPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  mobile: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid mobile number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(255)
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  appointment_date: z.string().min(1, "Please pick a date"),
  appointment_time: z.string().min(1, "Please pick a time"),
  notes: z.string().max(500).optional().or(z.literal("")),
});

const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM",
];

function AppointmentsPage() {
  const [form, setForm] = useState({
    name: "", mobile: "", email: "", service: "", appointment_date: "",
    appointment_time: "", notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const payload = {
      ...parsed.data,
      email: parsed.data.email || null,
      notes: parsed.data.notes || null,
    };
    const { error } = await supabase.from("appointments").insert(payload);
    setSubmitting(false);
    if (error) {
      toast.error("Could not book. Please try again or call us.");
      return;
    }
    setSuccess(true);
    toast.success("Appointment requested! We'll confirm shortly.");
  };

  if (success) {
    return (
      <>
        <PageHeader eyebrow="Appointment" title="You're all set." />
        <div className="mx-auto max-w-xl px-4 py-12 md:px-8">
          <div className="rounded-3xl bg-white p-10 text-center shadow-card">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--rose)] text-white">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="mt-5 font-display text-3xl">Appointment Requested</h2>
            <p className="mt-3 text-muted-foreground">
              Thank you, <strong>{form.name}</strong>! Our team will call you on{" "}
              <strong>{form.mobile}</strong> shortly to confirm your{" "}
              <strong>{form.service}</strong> on{" "}
              <strong>{form.appointment_date}</strong> at{" "}
              <strong>{form.appointment_time}</strong>.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
              >
                Chat on WhatsApp
              </a>
              <Link
                to="/"
                className="rounded-full border border-[var(--rose)]/30 px-5 py-3 text-sm font-semibold text-[var(--rose)]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Book now"
        title="Reserve your beauty slot."
        subtitle="Fill the form and our team will call you to confirm."
      />
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        <form
          onSubmit={onSubmit}
          className="rounded-3xl bg-white p-6 shadow-card md:p-10"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full Name *">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
                placeholder="Your name"
              />
            </Field>
            <Field label="Mobile Number *">
              <input
                required
                type="tel"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className={inputCls}
                placeholder="+91 …"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputCls}
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Service *">
              <select
                required
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className={inputCls}
              >
                <option value="">Select a service</option>
                {ALL_SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Preferred Date *">
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--rose)]" />
                <input
                  required
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.appointment_date}
                  onChange={(e) => setForm({ ...form, appointment_date: e.target.value })}
                  className={`${inputCls} pl-9`}
                />
              </div>
            </Field>
            <Field label="Preferred Time *">
              <div className="relative">
                <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--rose)]" />
                <select
                  required
                  value={form.appointment_time}
                  onChange={(e) => setForm({ ...form, appointment_time: e.target.value })}
                  className={`${inputCls} pl-9`}
                >
                  <option value="">Select time</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Notes (optional)">
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className={inputCls}
                placeholder="Anything we should know? Allergies, preferred artist…"
              />
            </Field>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-[var(--rose)] px-6 py-4 text-sm font-semibold text-white shadow-soft disabled:opacity-60"
          >
            {submitting ? "Booking…" : "Request Appointment"}
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            By submitting you agree to be contacted on your provided mobile number.
          </p>
        </form>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-2xl border border-[var(--rose)]/20 bg-[var(--cream)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--rose)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--ink)]/70">
        {label}
      </span>
      {children}
    </label>
  );
}
