import { createCookie, redirect, redirectDocument, unstable_createContext, unstable_RouterContextProvider, type unstable_MiddlewareFunction } from "react-router";
import type { LocaleContext, LocaleCookieValue } from "./types";
import { IntlVariations, setupFbtee } from "fbtee";
import languages from "~/fbtee/languages";
import { DEFAULT_COOKIE_NAME, DEFAULT_LOCALE } from "./constants";
import { loadTranslations } from "./utils";
    
const localeCookie = createCookie(DEFAULT_COOKIE_NAME, {
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  httpOnly: false,
});


export const localeContext = 
  unstable_createContext<LocaleContext | null>(null);

export const fbteeMiddleware : unstable_MiddlewareFunction<Response> = async ({ context, request }, next)  => {
  const newLocale = await resolveNewLocale(request);
  const savedLocale = await resolveCookieLocale(request);

  const locale = newLocale || savedLocale || DEFAULT_LOCALE;

  if (newLocale && newLocale !== savedLocale) {
    console.log(`Changing locale from ${savedLocale} to ${newLocale}. Redirecting...`);
    const url = new URL(request.url);
    url.searchParams.delete("lang");
    throw redirectDocument(url.toString(), {
      headers: {
        "Set-Cookie": await localeCookie.serialize(newLocale),
      },
    });
  }

  const translations = await loadTranslations(locale);

  setupFbtee({
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale: locale
      }),
    },
    translations: { [locale]: translations || {} },
  });

  context.set(localeContext, { 
    locale,
    gender: IntlVariations.GENDER_UNKNOWN, 
    localeName: languages.get(locale) || "Unknown",
    availableLanguages: languages,
  });

  console.log(`Set up LocaleContext with locale: ${locale}`);

  //const response = await next();
  //response.headers.append("Set-Cookie", await localeCookie.serialize(locale));
  //return response;
}

export const getLocaleContext = (context: unstable_RouterContextProvider): LocaleContext => {
  const locale = context.get(localeContext);
  if (!locale) {
    throw new Response("Locale not set", { status: 500 });
  }
  return locale;
};

const resolveCookieLocale = async (request: Request): Promise<string | undefined> => {
   return localeCookie.parse(request.headers.get("Cookie"));
};

const resolveNewLocale = async (request: Request): Promise<string | undefined> => {
  const url = new URL(request.url);
  const langParam = url.searchParams.get("lang");
  console.log(`Resolving langParam: ${langParam}`);
  const localeFromUrl = langParam && languages.has(langParam) ? langParam : null;

  console.log(`Resolving locale from URL: ${localeFromUrl}`);

  return localeFromUrl || undefined;

}
