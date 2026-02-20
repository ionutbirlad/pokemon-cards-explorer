import type { ApiErrorKind } from "@/types/shared/api";

export function getErrorMessage(status: number, kind?: ApiErrorKind): string {
  if (kind === "network") return "Check your connection and try again.";
  if (status === 404) return "Item not found.";
  if (status >= 500) return "System error. Please try again later.";
  return "Something went wrong. Please try again.";
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly kind?: ApiErrorKind;
  readonly data?: unknown;

  constructor(args: { status: number; kind?: ApiErrorKind; message: string; data?: unknown }) {
    super(args.message);
    this.name = "ApiClientError";
    this.status = args.status;
    this.kind = args.kind;
    this.data = args.data;
  }
}

export function toApiClientError(input: {
  status: number;
  kind?: ApiErrorKind;
  serverMessage?: string;
  data?: unknown;
}): ApiClientError {
  const message = input.serverMessage?.trim() || getErrorMessage(input.status, input.kind);
  return new ApiClientError({
    status: input.status,
    kind: input.kind,
    message,
    data: input.data,
  });
}
