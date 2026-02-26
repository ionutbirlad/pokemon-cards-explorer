import Spinner from "@/components/ui/Spinner/Spinner";

import styles from "./LoadingOverlay.module.scss";

export default function LoadingOverlay() {
  return (
    <div className={styles.overlay}>
      <Spinner size={80} />
    </div>
  );
}
