import { IntlVariations } from "fbtee";
import type { LocaleContext } from "./types";
import languages from "~/fbtee/languages";

export const DEFAULT_COOKIE_NAME = "APP_LANG";
export const DEFAULT_LOCALE = "en";

export const DEFAULT_LOCALE_CONTEXT: LocaleContext = {
  gender: IntlVariations.GENDER_UNKNOWN,
  locale: DEFAULT_LOCALE,
  localeName: languages.get(DEFAULT_LOCALE) || "Unknown",
  availableLanguages: languages,
};


