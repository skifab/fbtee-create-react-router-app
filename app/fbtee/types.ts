import type { IntlVariations } from "fbtee";

export type LocaleContext = {
  gender: IntlVariations;
  locale: string;
  localeName: string;
  availableLanguages: Map<string, string>;
};

export type LocaleCookieValue = {
  locale: string;
}
