import styles from "./Badge.module.scss";

type BadgeVariant = "light" | "dark";

type BadgeProps = {
  label?: string;
  icon: React.ReactNode;
  variant?: BadgeVariant;
};

export default function Badge({ label, icon, variant = "light" }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[`badge--${variant}`]}`}>
      {label && <span className={styles.badge__label}>{label}</span>}
      <span className={styles.badge__icon}>{icon}</span>
    </span>
  );
}
