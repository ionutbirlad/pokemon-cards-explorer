export type RemotePokemonTypology = {
  name: string;
  icon_url: string;
  icon_name: string;
};

export type RemotePokemonEnergy = {
  name: string;
  icon_url: string;
};

export type RemotePokemonVulnerability = {
  icon_url: string;
  value: number;
};

export type RemotePokemonListItem = {
  id: string;
  name: string;
  short_description: string;
  image_url: string;
};

export type RemotePokemonDetail = {
  id: string;
  name: string;
  subtitle: string;
  card_number: string;
  level: number;
  health_points: number;
  rarity: string;
  short_description: string;
  long_description: string;
  typology: RemotePokemonTypology;
  energy: RemotePokemonEnergy;
  vulnerability: RemotePokemonVulnerability;
  extra_details: string;
  image_url: string;
};
