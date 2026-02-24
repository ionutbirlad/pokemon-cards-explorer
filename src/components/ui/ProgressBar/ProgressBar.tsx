import styles from "./ProgressBar.module.scss";

type ProgressBarProps = {
  progress: number; // 0-100
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={styles.progressBar}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.progressBar__fill} style={{ width: `${clamped}%` }} />
    </div>
  );
}
