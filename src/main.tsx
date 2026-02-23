import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "@/app/router";
import { QueryProvider } from "@/query/QueryProvider";

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./msw/browser");
    await worker.start();
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </StrictMode>,
  );
}

void bootstrap();
