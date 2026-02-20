export type PokemonListItem = {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
};

export type PokemonTypology = {
  name: string;
  iconUrl: string;
  iconName: string;
};

export type PokemonEnergy = {
  name: string;
  iconUrl: string;
};

export type PokemonVulnerability = {
  iconUrl: string;
  value: number;
};

export type PokemonDetail = {
  id: string;
  name: string;
  subtitle: string;
  cardNumber: string;
  level: number;
  healthPoints: number;
  rarity: string;
  shortDescription: string;
  longDescription: string;
  typology: PokemonTypology;
  energy: PokemonEnergy;
  vulnerability: PokemonVulnerability;
  extraDetails: string;
  imageUrl: string;
};
