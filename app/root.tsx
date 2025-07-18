import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type unstable_MiddlewareFunction,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { useLocaleContext} from "./hooks";
import { fbteeMiddleware, getLocaleContext } from "./fbtee/middleware";
import { LanguageSelector } from "./LanguageSelector";
import { fbs } from "fbtee";
import { MainMenu } from "./MainMenu";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Server-side Locale Middleware
export const unstable_middleware: unstable_MiddlewareFunction<Response>[] = [
  fbteeMiddleware
];

export async function loader({
  context,
}: Route.LoaderArgs) {
  const locale = getLocaleContext(context);
  return { locale }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const localeContext = useLocaleContext();
  return (
    <html lang={localeContext.locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (<>
    <header className="flex justify-between p-4">
      <MainMenu />
      <LanguageSelector />
    </header>
    <Outlet />
  </>
    )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message : string = fbs("Oops!", "error message - boundary error");
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? fbs("404", "error message - 404") : fbs("Error", "error message - general");
    details =
      error.status === 404
        ? fbs("The requested page could not be found.", "error details - 404")
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
