// Element to display finished print jobs that are in need of attention

import styles from "./FinishedPrints.module.css";
import CarbonAPI from "../api/CarbonAPI";

export default function FinishedPrints() {
  return (
    <div className={styles.finished_container}>
      <h2>Ready To Pull</h2>
      <CarbonAPI printState="WANT_PART_REMOVAL" />
    </div>
  );
}
