import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const overridesDir = path.join(root, "i18n", "overrides", "navex");

const langs = fs
  .readdirSync(overridesDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .filter((code) => code !== "en");

for (const lang of langs.sort()) {
  execSync(`node "${path.join(__dirname, "apply-navex-override.mjs")}" ${lang}`, {
    cwd: root,
    stdio: "inherit",
  });
}
