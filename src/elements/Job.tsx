// Element to hold info for a single print job.

import styles from "./Job.module.css";
import CarbonAPI from "../api/CarbonAPI";

export default function Job() {
  return (
    <div className={styles.print_job}>
      PrintJob
      {/* Placeholder ensuring API pull works properly */}
      <CarbonAPI />
    </div>
  );
}
