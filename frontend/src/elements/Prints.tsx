// Main container element to hold active and finished print lists

import styles from "./Prints.module.css";
import FinishedPrints from "./FinishedPrints";
import ActivePrints from "./ActivePrints";

export default function Prints() {
  return (
    <div className={styles.prints_container}>
      <FinishedPrints />
      <ActivePrints />
    </div>
  );
}
