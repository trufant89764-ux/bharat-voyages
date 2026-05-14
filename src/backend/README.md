# Backend

This folder holds all backend / database access code (Lovable Cloud + Supabase).

- `index.js` — exports the configured Supabase client.
- Add data-access helpers here (e.g. `destinations.js`, `auth.js`) and import them
  from frontend components via `import { supabase } from "@/backend"`.

The auto-generated files in `src/integrations/supabase/` (client.ts, types.ts)
must stay in TypeScript — Lovable regenerates them automatically.
