import { useNavigate } from "react-router-dom";

import notFoundImage from "@/assets/images/general/404.png";
import Button from "@/components/ui/Button/Button";

import styles from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className={styles.page}>
      <img src={notFoundImage} alt="404 - Pagina non trovata" className={styles.image} />
      <h2 className={styles.title}>Ooops!</h2>
      <p className={styles.description}>Sembra che ci sia stato un problema, torna all'hompage.</p>
      <Button onClick={() => navigate("/")} status="active">
        VAI ALLA HOME
      </Button>
    </section>
  );
}
