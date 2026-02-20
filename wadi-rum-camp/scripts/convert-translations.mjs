import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src", "translations");
const localesDir = path.join(root, "src", "locales");

const languages = ["en", "ar", "fr", "es", "pt", "de", "it"];

async function loadTranslation(lang) {
  const filePath = path.join(srcDir, `${lang}.js`);
  const moduleUrl = pathToFileURL(filePath).href;
  const mod = await import(moduleUrl);
  return mod.default;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeJson(lang, data) {
  const langDir = path.join(localesDir, lang);
  await ensureDir(langDir);
  const outPath = path.join(langDir, "translation.json");
  const json = JSON.stringify(data, null, 2) + "\n";
  await fs.writeFile(outPath, json, "utf8");
}

async function run() {
  await ensureDir(localesDir);
  for (const lang of languages) {
    const data = await loadTranslation(lang);
    await writeJson(lang, data);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
