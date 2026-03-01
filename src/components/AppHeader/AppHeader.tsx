import { Link } from "react-router-dom";

import logo from "@/assets/images/general/logo.png";

import styles from "./AppHeader.module.scss";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="Pokémon Trading Card Game" className={styles.header__logo} />
      </Link>
    </header>
  );
}
