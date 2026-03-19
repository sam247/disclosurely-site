import type { Lang } from "@/lib/hreflang";
import { supportedLanguages } from "@/lib/hreflang";

import en from "@/i18n/locales/en.json";
import es from "@/i18n/locales/es.json";
import fr from "@/i18n/locales/fr.json";
import de from "@/i18n/locales/de.json";
import pl from "@/i18n/locales/pl.json";
import sv from "@/i18n/locales/sv.json";
import no from "@/i18n/locales/no.json";
import pt from "@/i18n/locales/pt.json";
import it from "@/i18n/locales/it.json";
import nl from "@/i18n/locales/nl.json";
import da from "@/i18n/locales/da.json";
import el from "@/i18n/locales/el.json";

export type BlogChrome = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  latest: string;
  categoriesNavLabel: string;
  noPostsTitle: string;
  noPostsBody: string;
  goHome: string;
  minRead: string;
  backToBlog: string;
  relatedArticles: string;
  readArticle: string;
  readArticleAria: string;
  byAuthor: string;
  noDate: string;
};

const packs: Record<string, BlogChrome> = {
  en: en.blog as BlogChrome,
  es: es.blog as BlogChrome,
  fr: fr.blog as BlogChrome,
  de: de.blog as BlogChrome,
  pl: pl.blog as BlogChrome,
  sv: sv.blog as BlogChrome,
  no: no.blog as BlogChrome,
  pt: pt.blog as BlogChrome,
  it: it.blog as BlogChrome,
  nl: nl.blog as BlogChrome,
  da: da.blog as BlogChrome,
  el: el.blog as BlogChrome,
};

export function resolveSiteLang(headerLang: string | null | undefined): Lang {
  const v = headerLang || "";
  return supportedLanguages.includes(v as Lang) ? (v as Lang) : "en";
}

export function getBlogChrome(headerLang: string | null | undefined): BlogChrome {
  const lang = resolveSiteLang(headerLang);
  return packs[lang] ?? packs.en;
}
