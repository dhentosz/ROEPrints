// Element to display prints that are actively building

import styles from "./ActivePrints.module.css";
import CarbonAPI from "../api/CarbonAPI";

export default function ActivePrints() {
  return (
    <div className={styles.active_container}>
      <h2>Currently Printing</h2>
      <CarbonAPI printState="FINISHING_JOB" />
      <CarbonAPI printState="PRINTING" />
    </div>
  );
}
