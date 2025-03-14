// Element to display prints that are actively building

import styles from "./ActivePrints.module.css";
import Job from "./Job";

export default function ActivePrints() {
  return (
    <div className={styles.active_container}>
      active
      <Job />
    </div>
  );
}
