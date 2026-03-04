import PokeballIcon from "@/assets/icons/pokeball.svg?react";

import styles from "./Spinner.module.scss";

type SpinnerProps = {
  size?: number;
};

export default function Spinner({ size = 64 }: SpinnerProps) {
  return (
    <div
      className={styles.spinner}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <PokeballIcon className={styles.spinner__icon} />
    </div>
  );
}
