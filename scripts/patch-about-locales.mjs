/**
 * Merges i18n/patches/about.<lang>.json into i18n/locales/<lang>.json at key `about`.
 * Run: node scripts/patch-about-locales.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const patchesDir = path.join(root, "i18n", "patches");
const localesDir = path.join(root, "i18n", "locales");

const langs = ["de", "fr", "es", "it", "nl", "pl", "pt", "sv", "no", "da", "el"];

for (const lang of langs) {
  const patchPath = path.join(patchesDir, `about.${lang}.json`);
  const localePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(patchPath)) {
    console.error("Missing patch:", patchPath);
    process.exit(1);
  }
  const about = JSON.parse(fs.readFileSync(patchPath, "utf8"));
  const j = JSON.parse(fs.readFileSync(localePath, "utf8"));
  j.about = about;
  fs.writeFileSync(localePath, JSON.stringify(j, null, 2) + "\n");
  console.log("patched", lang);
}
