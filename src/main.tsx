import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./msw/browser");
    await worker.start();
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void bootstrap();
