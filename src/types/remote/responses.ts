import { type RemoteJob, type RemoteJobStartResponse } from "./job";
import { type RemotePokemonDetail, type RemotePokemonListItem } from "./pokemon";

export type PokemonListResponse = RemotePokemonListItem[];
export type PokemonDetailResponse = RemotePokemonDetail;
export type JobStartResponse = RemoteJobStartResponse;
export type JobStatusResponse = RemoteJob;
