// Element to hold info for a single print job.

import styles from "./Job.module.css";

// Interface to explicitly define prop types.
interface Props {
  printerName: string;
  jobName: string;
}

export default function Job({ printerName, jobName }: Props) {
  return (
    <div className={styles.print_job}>
      <h3>{printerName}</h3>
      <h4>{jobName}</h4>
    </div>
  );
}
