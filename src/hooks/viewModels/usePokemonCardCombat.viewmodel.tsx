import type { ReactNode } from "react";

import { getTypologyIcon } from "@/api/mappers/typology.mapper";
import EqualizerIcon from "@/assets/icons/equalizer.svg?react";
import HeartIcon from "@/assets/icons/favorite.svg?react";
import SkullOutlineIcon from "@/assets/icons/skull_outline.svg?react";
import StarIcon from "@/assets/icons/star.svg?react";
import type { Job } from "@/types/domain/job";
import type { PokemonDetail } from "@/types/domain/pokemon";
import type { CardStatus } from "@/types/domain/ui";
import { getCardStatus } from "@/utils/getCardStatus";

type CombatState = "idle" | "queued" | "running" | "done" | "failed";

type PokemonCardCombatViewModel = {
  effectiveHp: number;
  effectiveStatus: CardStatus;
  typologyIcon: ReactNode;
  vulnerabilityIcon: ReactNode;
  widgetItems: { icon: ReactNode; label: string; status?: CardStatus }[];
  footerIcons: ReactNode[];
  showErrorOverlay: boolean;
  errorOverlayText: string | undefined;
  progressToShow: number | null;
  hasWon: boolean;
  hasLost: boolean;
  buttonLabel: string;
  combatState: CombatState;
  isFighting: boolean;
};

type Params = {
  pokemon: PokemonDetail | undefined;
  job: Job | undefined;
  isLocalStartJobError: boolean;
  isLocalUseJobError: boolean;
  startJobErrorMessage: string | undefined;
  useJobErrorMessage: string | undefined;
  jobId: string | undefined;
};

export function usePokemonCardCombat({
  pokemon,
  job,
  isLocalStartJobError,
  isLocalUseJobError,
  startJobErrorMessage,
  useJobErrorMessage,
  jobId,
}: Params): PokemonCardCombatViewModel {
  const baseHp = pokemon?.healthPoints ?? 0;
  const effectiveHp =
    job?.status === "done" && job.healthPoints != null ? job.healthPoints : baseHp;

  const effectiveStatus = getCardStatus(effectiveHp);

  const combatState: CombatState =
    jobId == null ? "idle" : ((job?.status ?? "queued") as CombatState);

  const isFighting = combatState === "running" || combatState === "queued";

  const typologyIcon = pokemon
    ? getTypologyIcon(pokemon.typology.iconName, pokemon.typology.iconUrl)
    : null;

  const vulnerabilityIcon = pokemon ? (
    <img
      src={pokemon.vulnerability.iconUrl}
      alt="vulnerability"
      style={{ width: "100%", height: "100%" }}
    />
  ) : null;

  const widgetItems = pokemon
    ? [
        { icon: <EqualizerIcon />, label: `LV. ${pokemon.level}` },
        { icon: vulnerabilityIcon, label: `VUL. ${pokemon.vulnerability.value}` },
        {
          icon: effectiveStatus === "expired" ? <SkullOutlineIcon /> : <HeartIcon />,
          label: `PS. ${effectiveHp}`,
          status: effectiveStatus,
        },
      ]
    : [];

  const footerIcons = pokemon ? [typologyIcon, <StarIcon />] : [];

  const showErrorOverlay = isLocalStartJobError || isLocalUseJobError || job?.status === "failed";

  const errorOverlayText = startJobErrorMessage ?? useJobErrorMessage ?? undefined;

  const progressToShow =
    combatState === "queued" || combatState === "running"
      ? (job?.progress ?? 0)
      : combatState === "done" || combatState === "failed"
        ? 100
        : null;

  const hasLost = combatState === "done" && effectiveStatus === "expired";
  const hasWon = combatState === "done" && !hasLost;

  const buttonLabel =
    combatState === "running" || combatState === "queued"
      ? "STA COMBATTENDO..."
      : combatState === "failed"
        ? "Errore tecnico. Riprova"
        : hasLost
          ? "HAI PERSO... RIPROVA!"
          : hasWon
            ? "HAI VINTO! RIGIOCA"
            : "SIMULA COMBATTIMENTO";

  return {
    effectiveHp,
    effectiveStatus,
    typologyIcon,
    vulnerabilityIcon,
    widgetItems,
    footerIcons,
    showErrorOverlay,
    errorOverlayText,
    progressToShow,
    hasWon,
    hasLost,
    buttonLabel,
    combatState,
    isFighting,
  };
}
