import "./AppLayout.css";

import { Outlet } from "react-router-dom";

import AppFooter from "../../components/AppFooter/AppFooter";
import AppHeader from "../../components/AppHeader/AppHeader";

export default function AppLayout() {
  return (
    <div>
      <AppHeader />

      <main>
        <Outlet />
      </main>

      <AppFooter />
    </div>
  );
}
