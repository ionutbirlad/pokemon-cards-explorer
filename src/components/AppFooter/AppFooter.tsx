import styles from "./AppFooter.module.scss";

export default function AppFooter() {
  return (
    <footer className={styles.footer}>
      <span className={styles.footer__text}>TheCardGame®</span>
    </footer>
  );
}
