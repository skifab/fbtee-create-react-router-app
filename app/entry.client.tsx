import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { setupFbteeClient } from "./fbtee/setup.client";

async function main() {

  await setupFbteeClient();

  startTransition(() => {
    hydrateRoot(
      document,
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
    );
  });
}

main().catch((error) => console.error(error));
