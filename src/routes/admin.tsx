import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Lock, Calendar, Mail, Star, LogOut } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/SiteLayout";
import { fetchAdminData } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — The Wow Factor Salon" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type AdminData = Awaited<ReturnType<typeof fetchAdminData>>;

function AdminPage() {
  const fetchFn = useServerFn(fetchAdminData);
  const [passcode, setPasscode] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fetchFn({ data: { passcode } });
      setData(result);
      toast.success("Welcome, admin!");
    } catch (err) {
      toast.error("Invalid passcode");
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await fetchFn({ data: { passcode } });
      setData(result);
    } catch {
      toast.error("Session expired");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <>
        <PageHeader eyebrow="Admin" title="Salon Dashboard" />
        <div className="mx-auto max-w-md px-4 py-16">
          <form
            onSubmit={handleLogin}
            className="rounded-3xl bg-white p-8 shadow-card"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--rose)]/10 text-[var(--rose)]">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-2xl">Enter admin passcode</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Private dashboard for salon staff.
            </p>
            <input
              type="password"
              required
              autoFocus
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Passcode"
              className="mt-6 w-full rounded-2xl border border-[var(--rose)]/20 bg-[var(--cream)] px-4 py-3 text-sm outline-none focus:border-[var(--rose)]"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-full bg-[var(--rose)] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Sign In"}
            </button>
          </form>
        </div>
      </>
    );
  }

  const stats = [
    { icon: Calendar, label: "Appointments", value: data.appointments.length },
    { icon: Mail, label: "Messages", value: data.messages.length },
    { icon: Star, label: "Reviews", value: data.reviews.length },
  ];

  return (
    <>
      <PageHeader eyebrow="Admin" title="Salon Dashboard" />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--peach)]/60 text-[var(--rose)]">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-2xl">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6 flex gap-2">
          <button
            onClick={refresh}
            disabled={loading}
            className="rounded-full bg-[var(--rose)] px-4 py-2 text-xs font-semibold text-white"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button
            onClick={() => { setData(null); setPasscode(""); }}
            className="inline-flex items-center gap-1 rounded-full border border-[var(--rose)]/30 px-4 py-2 text-xs font-semibold text-[var(--rose)]"
          >
            <LogOut className="h-3 w-3" /> Sign out
          </button>
        </div>

        <Section title="Appointment Requests" empty="No appointments yet.">
          {data.appointments.length > 0 && (
            <div className="overflow-x-auto rounded-2xl bg-white shadow-card">
              <table className="w-full text-sm">
                <thead className="bg-[var(--peach)]/40 text-left text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {data.appointments.map((a) => (
                    <tr key={a.id} className="border-t border-[var(--rose)]/10">
                      <td className="px-4 py-3 font-medium">{a.name}</td>
                      <td className="px-4 py-3">{a.mobile}</td>
                      <td className="px-4 py-3">{a.service}</td>
                      <td className="px-4 py-3">{a.appointment_date}</td>
                      <td className="px-4 py-3">{a.appointment_time}</td>
                      <td className="px-4 py-3 text-muted-foreground">{a.notes || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        <Section title="Contact Messages" empty="No messages yet.">
          {data.messages.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {data.messages.map((m) => (
                <div key={m.id} className="rounded-2xl bg-white p-5 shadow-card">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(m.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">{m.email} • {m.mobile || "—"}</div>
                  <p className="mt-3 text-sm text-[var(--ink)]/80">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Customer Reviews" empty="No reviews yet.">
          {data.reviews.length > 0 && (
            <div className="grid gap-3 md:grid-cols-3">
              {data.reviews.map((r) => (
                <div key={r.id} className="rounded-2xl bg-white p-5 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{r.customer_name}</span>
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[var(--rose)] text-[var(--rose)]" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-[var(--ink)]/80">"{r.review}"</p>
                </div>
              ))}
            </div>
          )}
        </Section>
      </section>
    </>
  );
}

function Section({
  title, empty, children,
}: { title: string; empty: string; children: React.ReactNode }) {
  const isEmpty = !children || (Array.isArray(children) && children.length === 0);
  return (
    <div className="mt-10">
      <h2 className="mb-4 font-display text-2xl">{title}</h2>
      {isEmpty ? (
        <div className="rounded-2xl bg-white p-8 text-center text-sm text-muted-foreground shadow-card">
          {empty}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
