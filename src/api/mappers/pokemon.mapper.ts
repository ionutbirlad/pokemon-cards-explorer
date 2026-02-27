import {
  type PokemonDetail,
  type PokemonEnergy,
  type PokemonListItem,
  type PokemonTypology,
  type PokemonVulnerability,
} from "@/types/domain/pokemon";
import {
  type RemotePokemonDetail as PokemonRemote,
  type RemotePokemonEnergy,
  type RemotePokemonListItem,
  type RemotePokemonTypology,
  type RemotePokemonVulnerability,
} from "@/types/remote/pokemon";

export function mapRemotePokemonTypology(t: RemotePokemonTypology): PokemonTypology {
  return {
    name: t.name,
    iconUrl: t.icon_url,
    iconName: t.icon_name,
  };
}

export function mapRemotePokemonEnergy(e: RemotePokemonEnergy): PokemonEnergy {
  return {
    name: e.name,
    iconUrl: e.icon_url,
  };
}

export function mapRemotePokemonVulnerability(v: RemotePokemonVulnerability): PokemonVulnerability {
  return {
    value: v.value,
    iconUrl: v.icon_url,
  };
}

export function mapRemotePokemonToListItem(p: RemotePokemonListItem): PokemonListItem {
  return {
    id: p.id,
    name: p.name,
    shortDescription: p.short_description,
    imageUrl: p.image_url,
  };
}

export function mapRemotePokemonToDetails(p: PokemonRemote): PokemonDetail {
  return {
    id: p.id,
    name: p.name,
    subtitle: p.subtitle,
    cardNumber: p.card_number,
    level: p.level,
    healthPoints: p.health_points,
    rarity: p.rarity,
    shortDescription: p.short_description,
    longDescription: p.long_description,
    typology: mapRemotePokemonTypology(p.typology),
    energy: mapRemotePokemonEnergy(p.energy),
    vulnerability: mapRemotePokemonVulnerability(p.vulnerability),
    extraDetails: p.extra_details,
    imageUrl: p.image_url,
  };
}
