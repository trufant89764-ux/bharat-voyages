import { transformSync } from "esbuild";
import { readFileSync, writeFileSync, unlinkSync, statSync, readdirSync } from "fs";
import { join, extname } from "path";

const ROOT = "src";
// Files we MUST keep as TypeScript
const KEEP_TS = new Set([
  "src/integrations/supabase/client.ts",
  "src/integrations/supabase/types.ts",
  "src/vite-env.d.ts",
]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const all = walk(ROOT);
let converted = 0;
for (const file of all) {
  const ext = extname(file);
  if (ext !== ".ts" && ext !== ".tsx") continue;
  if (KEEP_TS.has(file)) continue;
  if (file.endsWith(".d.ts")) continue;

  const src = readFileSync(file, "utf8");
  const isTsx = ext === ".tsx";
  const result = transformSync(src, {
    loader: isTsx ? "tsx" : "ts",
    jsx: "preserve",
    format: "esm",
    target: "esnext",
    // Strip types only, keep code shape
    tsconfigRaw: { compilerOptions: { verbatimModuleSyntax: false, useDefineForClassFields: true } },
  });
  const newPath = file.replace(/\.tsx?$/, isTsx ? ".jsx" : ".js");
  writeFileSync(newPath, result.code);
  if (newPath !== file) unlinkSync(file);
  converted++;
}
console.log("Converted:", converted);
