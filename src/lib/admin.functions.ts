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
      appointments: appts.data ?? [],
      messages: msgs.data ?? [],
      reviews: revs.data ?? [],
    };
  });
