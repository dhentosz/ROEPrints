// Element to display finished print jobs that are in need of attention

import styles from "./FinishedPrints.module.css";
import CarbonAPI from "../api/CarbonAPI";

export default function FinishedPrints() {
  return (
    <div className={styles.finished_container}>
      <h2>Ready</h2>
      <CarbonAPI printState="WANT_PART_REMOVAL" />

      {/* Remove line break later when adjsuting css and formatting. */}
      <br />

      <h2>Finishing</h2>
      <CarbonAPI printState="FINISHING_JOB" />
    </div>
  );
}
