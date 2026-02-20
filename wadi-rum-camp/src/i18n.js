import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";
import fr from "./locales/fr/translation.json";
import es from "./locales/es/translation.json";
import pt from "./locales/pt/translation.json";
import de from "./locales/de/translation.json";
import it from "./locales/it/translation.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  fr: { translation: fr },
  es: { translation: es },
  pt: { translation: pt },
  de: { translation: de },
  it: { translation: it },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "ar", "fr", "es", "pt", "de", "it"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
