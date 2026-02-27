import EcoIcon from "@/assets/icons/eco.svg?react";
import EqualizerIcon from "@/assets/icons/equalizer.svg?react";
import FireIcon from "@/assets/icons/local_fire_department.svg?react";
import StarIcon from "@/assets/icons/star.svg?react";
import WaterDropIcon from "@/assets/icons/water_drop.svg?react";
import type { PokemonTypologyKey } from "@/types/domain/ui";

const typologyIconMap: Record<PokemonTypologyKey, React.ReactNode> = {
  water_drop: <WaterDropIcon />,
  eco: <EcoIcon />,
  star: <StarIcon />,
  local_fire_department: <FireIcon />,
  equalizer: <EqualizerIcon />,
};

/**
 * Returns the SVG React component for the given icon_name.
 * Falls back to an <img> with the backend icon_url if the key is not mapped.
 * This ensures the UI never breaks when new typologies are added backend-side.
 */
export function getTypologyIcon(iconName: string, iconUrl: string): React.ReactNode {
  const mapped = typologyIconMap[iconName as PokemonTypologyKey];
  if (mapped) return mapped;
  return <img src={iconUrl} alt={iconName} style={{ width: "100%", height: "100%" }} />;
}
