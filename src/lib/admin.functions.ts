import { createServerFn } from "@tanstack/react-start";

export const fetchAdminData = createServerFn({ method: "POST" })
  .inputValidator((d: { passcode: string }) => d)
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSCODE || "wow-admin-2026";
    if (data.passcode !== expected) {
      throw new Error("Invalid passcode");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const admin = supabaseAdmin as unknown as { from: (t: string) => any };
    const [appts, msgs, revs] = await Promise.all([
      admin.from("appointments").select("*").order("created_at", { ascending: false }),
      admin.from("contact_messages").select("*").order("created_at", { ascending: false }),
      admin.from("reviews").select("*").order("created_at", { ascending: false }),
    ]);
    return {
      appointments: (appts.data ?? []) as Array<{ id: string; name: string; mobile: string; email: string | null; service: string; appointment_date: string; appointment_time: string; notes: string | null; created_at: string }>,
      messages: (msgs.data ?? []) as Array<{ id: string; name: string; email: string; mobile: string | null; message: string; created_at: string }>,
      reviews: (revs.data ?? []) as Array<{ id: string; customer_name: string; rating: number; review: string; created_at: string }>,
    };
  });
