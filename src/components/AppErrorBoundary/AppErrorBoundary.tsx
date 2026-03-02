import type { ReactNode } from "react";
import { Component } from "react";

import psyduckError from "@/assets/images/general/psyduckError.png";

import Button from "../ui/Button/Button";
import styles from "./AppErrorBoundary.module.scss";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error("Global app crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.wrapper__card}>
            <div className={styles["wrapper__card-imageWrapper"]}>
              <img
                src={psyduckError}
                alt="Psyduck confuso"
                className={styles["wrapper__card-imageWrapper-image"]}
              />
            </div>

            <h1 className={styles["wrapper__card-title"]}>Ops! Qualcosa è andato storto.</h1>

            <p className={styles["wrapper__card-description"]}>
              Si è verificato un errore imprevisto durante il caricamento dell'applicazione. Ti
              consigliamo di aggiornare la pagina e riprovare.
            </p>

            <Button
              className={styles["wrapper__card-button"]}
              onClick={() => window.location.reload()}
            >
              Ricarica la pagina 🔄
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
