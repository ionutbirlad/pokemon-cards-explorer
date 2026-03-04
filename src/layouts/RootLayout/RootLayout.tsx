import { Outlet } from "react-router-dom";

import AppFooter from "@/components/AppFooter/AppFooter";
import AppHeader from "@/components/AppHeader/AppHeader";

import styles from "./RootLayout.module.scss";

export default function RootLayout() {
  return (
    <div className={styles.layout}>
      <AppHeader />

      <main className={styles.main}>
        <Outlet />
      </main>

      <AppFooter />
    </div>
  );
}
