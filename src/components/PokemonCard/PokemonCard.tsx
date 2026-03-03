import type { CardStatus } from "@/types/domain/ui";

import CardFooter from "./CardFooter/CardFooter";
import CardHeading from "./CardHeading/CardHeading";
import CardImage from "./CardImage/CardImage";
import CardWidget from "./CardWidget/CardWidget";
import styles from "./PokemonCard.module.scss";

type CardItem = {
  icon: React.ReactNode;
  iconOutline?: React.ReactNode;
  label: string;
};

type PokemonCardProps = {
  // Data
  number: string;
  name: string;
  description: string;
  imageSrc: string;
  typologyName: string;
  typologyIcon: React.ReactNode;
  footerLabel: string;
  footerIcons: React.ReactNode[];
  items: CardItem[];
  // UI
  status?: CardStatus;
  variant?: "full" | "compact";
  showErrorOverlay?: boolean;
  errorOverlayText?: string;
};

export default function PokemonCard({
  number,
  name,
  description,
  imageSrc,
  typologyName,
  typologyIcon,
  footerLabel,
  footerIcons,
  items,
  status = "default",
  variant = "full",
  showErrorOverlay = false,
  errorOverlayText = "Oops... qualcosa è andato storto!",
}: PokemonCardProps) {
  const widgetItems = items.map((item) => ({
    icon: status !== "default" && item.iconOutline ? item.iconOutline : item.icon,
    label: item.label,
    status: item === items[items.length - 1] ? status : ("default" as CardStatus),
  }));

  return (
    <div className={`${styles.card} ${!showErrorOverlay && styles["card--shadow"]}`}>
      {showErrorOverlay && (
        <div className={styles.card__overlay}>
          <div className={styles["card__overlay-inner"]}>{errorOverlayText}</div>
        </div>
      )}

      {variant === "full" && (
        <CardHeading
          cardNumber={number}
          typologyName={typologyName}
          typologyIcon={typologyIcon}
          status={status}
        />
      )}

      <CardImage src={imageSrc} alt={name} status={status} />

      <div className={styles.card__body}>
        <h3 className={styles.card__name}>{name}</h3>
        <p className={styles.card__description}>{description}</p>
      </div>

      {variant === "full" && (
        <>
          <CardWidget items={widgetItems} />
          <CardFooter label={footerLabel} icons={footerIcons} />
        </>
      )}
    </div>
  );
}
