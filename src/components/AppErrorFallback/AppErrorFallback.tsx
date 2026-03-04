import psyduckError from "@/assets/images/general/psyduckError.png";
import Button from "@/components/ui/Button/Button";

import styles from "./AppErrorFallback.module.scss";

type Props = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  onReload?: () => void;
};

export default function AppErrorFallback({
  title = "Ops! Qualcosa è andato storto.",
  description = `Si è verificato un errore imprevisto durante il caricamento dell'applicazione. Ti consigliamo di aggiornare la pagina e riprovare.`,
  buttonLabel = "Ricarica la pagina 🔄",
  onReload,
}: Props) {
  const handleReload = () => {
    if (onReload) onReload();
    else window.location.reload();
  };

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

        <h1 className={styles["wrapper__card-title"]}>{title}</h1>

        <p className={styles["wrapper__card-description"]}>{description}</p>

        <Button className={styles["wrapper__card-button"]} onClick={handleReload}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
