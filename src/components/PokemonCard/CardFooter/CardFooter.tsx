import Badge from "@/components/ui/Badge/Badge";

import styles from "./CardFooter.module.scss";

type CardFooterProps = {
  label: string;
  icons: React.ReactNode[];
};

export default function CardFooter({ label, icons }: CardFooterProps) {
  return (
    <div className={styles.footer}>
      <span className={styles.footer__label}>{label}</span>
      <div className={styles.footer__badges}>
        {icons.map((icon, index) => (
          <Badge key={index} icon={icon} label="" variant="dark" />
        ))}
      </div>
    </div>
  );
}
