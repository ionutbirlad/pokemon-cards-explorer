import type { CardStatus } from "@/types/domain/ui";

export function getCardStatus(healthPoints: number): CardStatus {
  if (healthPoints === 0) return "expired";
  if (healthPoints <= 20) return "warning";
  return "default";
}
