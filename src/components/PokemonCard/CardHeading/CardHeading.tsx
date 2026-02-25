import Badge from "@/components/ui/Badge/Badge";
import type { CardStatus } from "@/types/domain/ui";

import styles from "./CardHeading.module.scss";

type CardHeadingProps = {
  cardNumber: string;
  typologyName: string;
  typologyIcon: React.ReactNode;
  status: CardStatus;
};

export default function CardHeading({
  cardNumber,
  typologyName,
  typologyIcon,
  status,
}: CardHeadingProps) {
  return (
    <div className={`${styles.heading} ${styles[`heading--${status}`]}`}>
      <span className={styles.heading__number}>N. {cardNumber}</span>
      <Badge label={typologyName.toUpperCase()} icon={typologyIcon} variant="light" />
    </div>
  );
}
