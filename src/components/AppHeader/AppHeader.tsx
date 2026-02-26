import logo from "@/assets/images/general/logo.png";

import styles from "./AppHeader.module.scss";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Pokémon Trading Card Game" className={styles.header__logo} />
    </header>
  );
}
