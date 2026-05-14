// Backend layer — all server/database access lives here.
// Frontend components should import from "@/backend" instead of supabase directly.
export { supabase } from "@/integrations/supabase/client";
