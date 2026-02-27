import { toApiClientError } from "@/lib/errors";
import type { PokemonDetail, PokemonListItem } from "@/types/domain/pokemon";
import type { RemotePokemonDetail, RemotePokemonListItem } from "@/types/remote/pokemon";

import { api } from "./api";
import { mapRemotePokemonToDetails, mapRemotePokemonToListItem } from "./mappers/pokemon.mapper";

export async function fetchPokemonList(signal?: AbortSignal): Promise<PokemonListItem[]> {
  const res = await api<RemotePokemonListItem[]>("/api/items", { signal });

  if (!res.ok) {
    throw toApiClientError({
      status: res.status,
      kind: res.kind,
      serverMessage: res.errorMessage,
      data: res.data,
    });
  }

  return res.data.map(mapRemotePokemonToListItem);
}

export async function fetchPokemonById(id: string, signal?: AbortSignal): Promise<PokemonDetail> {
  const res = await api<RemotePokemonDetail>(`/api/items/${encodeURIComponent(id)}`, { signal });

  if (!res.ok) {
    throw toApiClientError({
      status: res.status,
      kind: res.kind,
      serverMessage: res.errorMessage,
      data: res.data,
    });
  }

  return mapRemotePokemonToDetails(res.data);
}
