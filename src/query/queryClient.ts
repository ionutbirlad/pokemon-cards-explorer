import { QueryCache, QueryClient } from "@tanstack/react-query";

import { isApiClientError, isGlobalError } from "@/lib/errors";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      // Only handle "global" errors here to avoid double UX (inline + toast).
      if (!isGlobalError(error)) return;

      const message = isApiClientError(error)
        ? error.message
        : "Something went wrong. Please try again.";

      // Placeholder: keep it simple for now, we can plug a toast later.
      console.error("[Global error]", message);
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Avoid retrying 404 and most 4xx.
        if (isApiClientError(error)) {
          if (error.status === 404) return false;
          if (error.kind === "network") return failureCount < 2;
          if (error.status >= 500) return failureCount < 2;
          return false;
        }

        return failureCount < 1;
      },
    },
    mutations: {
      retry: 0,
    },
  },
});
