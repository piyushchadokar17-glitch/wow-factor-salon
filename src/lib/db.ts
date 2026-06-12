import { supabase } from "@/integrations/supabase/client";

// Loose-typed client used by the app until generated types catch up.
// Tables: appointments, contact_messages, reviews, gallery
export const db = supabase as unknown as {
  from: (table: string) => any;
};
