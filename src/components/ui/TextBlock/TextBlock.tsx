import styles from "./TextBlock.module.scss";

type TextBlockVariant = "default" | "empty";

type TextBlockProps = {
  title?: string;
  description: string;
  variant?: TextBlockVariant;
};

export default function TextBlock({ title, description, variant = "default" }: TextBlockProps) {
  return (
    <div className={`${styles.block} ${styles[`block--${variant}`]}`}>
      {title && <h2 className={styles.block__title}>{title}</h2>}
      <p className={styles.block__description}>{description}</p>
    </div>
  );
}
