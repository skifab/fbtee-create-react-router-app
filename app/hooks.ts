import { useRouteError, useRouteLoaderData } from "react-router";
import type { Route } from "./+types/root";
import type { LocaleContext } from "./fbtee/types";
import { DEFAULT_LOCALE_CONTEXT } from "./fbtee/constants";

/**
 * Get the locale returned by the root route loader
 */
export function useLocaleContext(): LocaleContext {
	const data = useRouteLoaderData<Route.ComponentProps["loaderData"]>("root");
    const error = useRouteError();

    if (!data?.locale && !error) {
        throw new Error("Locale not found in root loader data"); 
    }

    return data?.locale || DEFAULT_LOCALE_CONTEXT;
}