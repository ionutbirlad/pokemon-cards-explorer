import type { CardStatus } from "@/types/domain/ui";

import styles from "./CardItem.module.scss";

type CardItemProps = {
  icon: React.ReactNode;
  label: string;
  status?: CardStatus;
};

export default function CardItem({ icon, label, status = "default" }: CardItemProps) {
  return (
    <div className={`${styles.item} ${styles[`item--${status}`]}`}>
      <span className={styles.item__icon}>{icon}</span>
      <span className={styles.item__label}>{label}</span>
    </div>
  );
}
