export type ApiErrorKind = "network" | "http";

export type ApiResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; kind: ApiErrorKind; errorMessage: string; data?: unknown };
