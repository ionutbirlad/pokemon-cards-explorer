import { useQuery } from "@tanstack/react-query";

import { fetchPokemonList } from "@/api/pokemonApi";

import { pokemonKeys } from "./keys";

export function usePokemonList() {
  return useQuery({
    queryKey: pokemonKeys.list(),
    queryFn: ({ signal }) => fetchPokemonList(signal),
    staleTime: 30_000,
  });
}
