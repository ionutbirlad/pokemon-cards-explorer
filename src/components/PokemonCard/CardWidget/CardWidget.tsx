import type { CardStatus } from "@/types/domain/ui";

import CardItem from "../CardItem/CardItem";
import styles from "./CardWidget.module.scss";

type CardWidgetItem = {
  icon: React.ReactNode;
  label: string;
  status?: CardStatus;
};

type CardWidgetProps = {
  items: CardWidgetItem[];
};

export default function CardWidget({ items }: CardWidgetProps) {
  return (
    <div className={styles.widget}>
      {items.map((item, index) => (
        <CardItem key={index} icon={item.icon} label={item.label} status={item.status} />
      ))}
    </div>
  );
}
