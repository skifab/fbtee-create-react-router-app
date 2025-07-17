import { DEFAULT_LOCALE } from "./constants";
import languages from "./languages";

export const supportedLocaleOrDefault = (locale?: string): string => {
  if (!locale || !languages.has(locale)) {
    console.warn(`Unsupported locale "${locale}", falling back to default "${DEFAULT_LOCALE}"`);
    return DEFAULT_LOCALE;
  }
  return locale;
}

export const loadTranslations = async (locale: string) => {
  if (locale === DEFAULT_LOCALE || !languages.has(locale)) {
    return {};
  }
  return (await import(`../translations/${locale}.json`)).default[locale]
}
