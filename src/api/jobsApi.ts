import { toApiClientError } from "@/lib/errors";
import type { RemoteJob, RemoteJobStartResponse } from "@/types/remote/job";

import { api } from "./api";

export async function startItemJob(
  itemId: string,
  signal?: AbortSignal,
): Promise<RemoteJobStartResponse> {
  const res = await api<RemoteJobStartResponse>(`/api/items/${encodeURIComponent(itemId)}/jobs`, {
    method: "POST",
    signal,
  });

  if (!res.ok) {
    throw toApiClientError({
      status: res.status,
      kind: res.kind,
      serverMessage: res.errorMessage,
      data: res.data,
    });
  }

  return res.data;
}

export async function fetchJobById(jobId: string, signal?: AbortSignal): Promise<RemoteJob> {
  const res = await api<RemoteJob>(`/api/jobs/${encodeURIComponent(jobId)}`, { signal });

  if (!res.ok) {
    throw toApiClientError({
      status: res.status,
      kind: res.kind,
      serverMessage: res.errorMessage,
      data: res.data,
    });
  }

  return res.data;
}
