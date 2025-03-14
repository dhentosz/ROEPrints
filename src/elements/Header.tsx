// Main Header element

import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <img src="src/images/roeIcon.png" alt="roeLogo" id={styles.logo}></img>
      ActivePrints
    </div>
  );
}
