import type { ApiErrorKind, ApiResult } from "@/types/shared/api";

type ApiMethod = "GET" | "POST";

type ApiOptions = {
  method?: ApiMethod;
  body?: unknown;
  signal?: AbortSignal;
};

// Keep empty for MSW (relative /api/*). Can be overridden via VITE_API_BASE_URL.
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

function extractMessage(data: unknown): string | undefined {
  if (typeof data === "object" && data !== null) {
    const d = data as Record<string, unknown>;

    if (typeof d.message === "string") return d.message;
    if (typeof d.detail === "string") return d.detail;
    if (typeof d.error === "string") return d.error;
  }

  return undefined;
}

async function readErrorPayload(res: Response): Promise<{ data?: unknown; message?: string }> {
  try {
    const data = (await res.json()) as unknown;
    const message = extractMessage(data);

    return { data, message };
  } catch {
    return {};
  }
}

export async function api<T>(path: string, options: ApiOptions = {}): Promise<ApiResult<T>> {
  const url = `${BASE_URL}${path}`;

  try {
    const res = await fetch(url, {
      method: options.method ?? "GET",
      headers: options.body ? { "Content-Type": "application/json" } : undefined,
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    });

    if (!res.ok) {
      const { data, message } = await readErrorPayload(res);
      const fallback = `Request failed (HTTP ${res.status}).`;

      return {
        ok: false,
        status: res.status,
        kind: "http" satisfies ApiErrorKind,
        errorMessage: message ?? fallback,
        data,
      };
    }

    // Handle empty body responses (e.g. 204)
    if (res.status === 204) {
      return { ok: true, status: res.status, data: undefined as T };
    }

    const data = (await res.json()) as T;

    return {
      ok: true,
      status: res.status,
      data,
    };
  } catch (err: unknown) {
    const isAbort = err instanceof DOMException && err.name === "AbortError";

    return {
      ok: false,
      status: 0,
      kind: "network" satisfies ApiErrorKind,
      errorMessage: isAbort ? "Request aborted." : "Network error. Please try again.",
    };
  }
}
