// Element to hold info for a single print job.

import styles from "./Job.module.css";

// Interface to explicitly define prop types.
interface Props {
  printerName: string;
  jobName: string;
  timeLeft: number;
  finishedAt: string;
}

export default function Job({
  printerName,
  jobName,
  timeLeft,
  finishedAt,
}: Props) {
  // Convert timeLeft to minutes.
  if (timeLeft > 0) {
    timeLeft = timeLeft / 60;
  }

  // Convert finishedAt to local time and format.
  finishedAt = new Date(finishedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Returns appropriate Job elements dependent on timeLeft.
  switch (true) {
    case timeLeft === 0:
      return (
        <div className={styles.print_job}>
          <h3>{printerName}</h3>
          <div>{jobName}</div>
          <div>Finished at: {finishedAt}</div>
        </div>
      );
    case timeLeft > 0 && timeLeft < 1:
      return (
        <div className={styles.print_job}>
          <h3>{printerName}</h3>
          <div>{jobName}</div>
          <h4>less than one minute left</h4>
        </div>
      );
    case timeLeft > 1 && timeLeft < 60:
      return (
        <div className={styles.print_job}>
          <h3>{printerName}</h3>
          <div>{jobName}</div>
          <h4>{Math.ceil(timeLeft)} minutes left</h4>
        </div>
      );
    case timeLeft > 60:
      return (
        <div className={styles.print_job}>
          <h3>{printerName}</h3>
          <div>{jobName}</div>
          <h4>
            {Math.floor(timeLeft / 60)} hours {Math.ceil(timeLeft % 60)} minutes
            left
          </h4>
        </div>
      );
  }
}
