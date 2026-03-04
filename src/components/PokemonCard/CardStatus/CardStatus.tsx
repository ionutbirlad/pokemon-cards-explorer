import SkullIcon from "@/assets/icons/skull.svg?react";

import styles from "./CardStatus.module.scss";

export default function CardStatus() {
  return (
    <div className={styles.status}>
      <SkullIcon className={styles.status__icon} />
    </div>
  );
}
