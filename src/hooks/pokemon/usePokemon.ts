import { useQuery } from "@tanstack/react-query";

import { fetchPokemonById } from "@/api/pokemonApi";

import { pokemonKeys } from "./keys";

export function usePokemon(id: string | undefined) {
  return useQuery({
    queryKey: id ? pokemonKeys.detail(id) : pokemonKeys.detail(""),
    queryFn: ({ signal }) => fetchPokemonById(id as string, signal),
    enabled: Boolean(id),
    staleTime: 30_000,
  });
}
