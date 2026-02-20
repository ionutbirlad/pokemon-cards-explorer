import { toApiClientError } from "@/lib/errors";
import type { RemotePokemonDetail, RemotePokemonListItem } from "@/types/remote/pokemon";

import { api } from "./api";

export async function fetchPokemonList(signal?: AbortSignal): Promise<RemotePokemonListItem[]> {
  const res = await api<RemotePokemonListItem[]>("/api/items", { signal });

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

export async function fetchPokemonById(
  id: string,
  signal?: AbortSignal,
): Promise<RemotePokemonDetail> {
  const res = await api<RemotePokemonDetail>(`/api/items/${encodeURIComponent(id)}`, { signal });

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
