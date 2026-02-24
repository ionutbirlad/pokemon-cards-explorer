import styles from "./Button.module.scss";
import StarIcon from "@/assets/icons/star.svg?react";

type ButtonStatus = "active" | "disabled";

type ButtonProps = {
  children: React.ReactNode;
  status?: ButtonStatus;
  onClick?: () => void;
};

export default function Button({ children, status = "active", onClick }: ButtonProps) {
  const isDisabled = status === "disabled";

  return (
    <button
      className={`${styles.button} ${styles[`button--${status}`]}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      <StarIcon className={styles.button__icon} />
      <span className={styles.button__label}>{children}</span>
    </button>
  );
}
