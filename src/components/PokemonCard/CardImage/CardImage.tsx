import type { CardStatus as CardStatusType } from "@/types/domain/ui";

import CardStatus from "../CardStatus/CardStatus";
import styles from "./CardImage.module.scss";

type CardImageProps = {
  src: string;
  alt: string;
  status: CardStatusType;
};

export default function CardImage({ src, alt, status }: CardImageProps) {
  const isExpired = status === "expired";

  return (
    <div className={styles.image}>
      <img
        src={src}
        alt={alt}
        className={`${styles.image__img} ${isExpired ? styles["image__img--expired"] : ""}`}
      />
      {isExpired && (
        <div className={styles.image__overlay}>
          <CardStatus />
        </div>
      )}
    </div>
  );
}
