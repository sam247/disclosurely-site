"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import pl from "./locales/pl.json";
import sv from "./locales/sv.json";
import no from "./locales/no.json";
import pt from "./locales/pt.json";
import it from "./locales/it.json";
import nl from "./locales/nl.json";
import da from "./locales/da.json";
import el from "./locales/el.json";

export const supportedLanguages = ["en", "es", "fr", "de", "pl", "sv", "no", "pt", "it", "nl", "da", "el"] as const;

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  pl: { translation: pl },
  sv: { translation: sv },
  no: { translation: no },
  pt: { translation: pt },
  it: { translation: it },
  nl: { translation: nl },
  da: { translation: da },
  el: { translation: el },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    returnObjects: true,
  });
}

export { i18n };

