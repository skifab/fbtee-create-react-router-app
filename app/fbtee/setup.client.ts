

import { IntlVariations, setupFbtee } from "fbtee";
import Cookies from "js-cookie";
import { DEFAULT_COOKIE_NAME, DEFAULT_LOCALE } from "./constants";
import type { LocaleCookieValue } from "./types";
import { loadTranslations, supportedLocaleOrDefault } from "./utils";

export const setupFbteeClient = async (cookieName: string = DEFAULT_COOKIE_NAME) => {
  const encodedCookieVal = Cookies.get(cookieName) as string | undefined
  const cookieLang = encodedCookieVal && JSON.parse(atob(encodedCookieVal)) as string;
  const locale = supportedLocaleOrDefault(cookieLang);
  
  console.info(`Setting up fbtee client with locale: ${locale}`);
  setupFbtee({
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale
      }),
    },
    translations: { [locale]: await loadTranslations(locale) || {} },
  });
  console.info(`fbtee client setup complete with locale: ${locale}`);
}
