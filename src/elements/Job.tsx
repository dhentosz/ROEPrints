// Element to hold info for a single print job.

import styles from "./Job.module.css";

// Interface to explicitly define prop types.
interface Props {
  printerName: string;
  jobName: string;
  timeLeft: number;
}

export default function Job({ printerName, jobName, timeLeft }: Props) {
  return (
    <div className={styles.print_job}>
      <h3>{printerName}</h3>
      <div>{jobName}</div>
      <h4>{Math.ceil(timeLeft / 60)} minutes left</h4>
    </div>
  );
}
