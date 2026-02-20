import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { QueryProvider } from "./query/QueryProvider";

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./msw/browser");
    await worker.start();
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryProvider>
        <App />
      </QueryProvider>
    </StrictMode>,
  );
}

void bootstrap();
