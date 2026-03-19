import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const localesDir = path.join(root, "i18n", "locales");
const overridesDir = path.join(root, "i18n", "overrides", "whistleblower");

const lang = process.argv[2];
if (!lang) {
  console.error("Usage: node apply-whistleblower-override.mjs <lang>");
  process.exit(1);
}

const overridePath = path.join(overridesDir, `${lang}.json`);
if (!fs.existsSync(overridePath)) {
  console.error("Missing override:", overridePath);
  process.exit(1);
}

const localePath = path.join(localesDir, `${lang}.json`);
const j = JSON.parse(fs.readFileSync(localePath, "utf8"));
j.compare.whistleblower = JSON.parse(fs.readFileSync(overridePath, "utf8"));
fs.writeFileSync(localePath, JSON.stringify(j, null, 2) + "\n");
console.log("Updated", lang);
