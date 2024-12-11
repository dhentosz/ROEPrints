import styles from "./FinishedPrints.module.css";
import Job from "./Job";

export default function FinishedPrints() {
  return (
    <div className={styles.finished_container}>
      finished
      <Job />
    </div>
  );
}
