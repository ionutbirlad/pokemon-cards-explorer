import type { ReactNode } from "react";

import StarIcon from "@/assets/icons/star.svg?react";

import styles from "./Button.module.scss";

type ButtonStatus = "active" | "disabled";

type ButtonProps = {
  children: ReactNode;
  status?: ButtonStatus;
  withIcon?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  status = "active",
  withIcon = true,
  onClick,
}: ButtonProps) {
  const isDisabled = status === "disabled";

  return (
    <button
      className={`${styles.button} ${styles[`button--${status}`]}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {withIcon && <StarIcon className={styles.button__icon} />}
      <span className={styles.button__label}>{children}</span>
    </button>
  );
}
