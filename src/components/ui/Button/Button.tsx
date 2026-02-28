import type { ReactNode } from "react";

import styles from "./Button.module.scss";

type ButtonStatus = "active" | "disabled";

type ButtonProps = {
  children: ReactNode;
  status?: ButtonStatus;
  className?: string;
  onClick?: () => void;
};

export default function Button({ children, status = "active", className, onClick }: ButtonProps) {
  const isDisabled = status === "disabled";

  return (
    <button
      className={`${styles.button} ${styles[`button--${status}`]} ${className ?? ""}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      <span className={styles.button__label}>{children}</span>
    </button>
  );
}
