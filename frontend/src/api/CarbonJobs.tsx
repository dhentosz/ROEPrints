// With print data from API, builds and sorts an array of Job items dependent upon printer state.

import { AllPrinterData } from "./CarbonDataInterfaces";
import Job from "../elements/Job";

export default function CarbonJobs(
  printData: AllPrinterData,
  printState: string
) {
  // Empty array for Job components to be gathered
  const jobs: JSX.Element[] = [];

  for (let i = 0; i < printData?.total_count; i++) {
    if (printState === printData?.printers[i].status.printer_state) {
      switch (printState) {
        case "PRINTING":
          jobs.push(
            <Job
              key={printData?.printers[i].prints.current.print_id}
              printerName={printData?.printers[i].alias}
              jobName={printData?.printers[i].prints.current.name}
              timeLeft={printData?.printers[i].prints.current.remaining_sec}
              finishedAt="N/A"
            />
          );
          jobs.sort((a, b) => a.props.timeLeft - b.props.timeLeft);
          break;
        case "FINISHING_JOB":
          jobs.push(
            <Job
              key={printData?.printers[i].prints.last.print_id}
              printerName={printData?.printers[i].alias}
              jobName="Print Finishing"
              timeLeft={0}
              finishedAt={printData?.printers[i].prints.last.finished_at}
            />
          );
          jobs.sort((a, b) =>
            a.props.finishedAt.localeCompare(b.props.finishedAt)
          );
          break;
        case "WANT_PART_REMOVAL":
          jobs.push(
            <Job
              key={printData?.printers[i].prints.last.print_id}
              printerName={printData?.printers[i].alias}
              jobName={printData?.printers[i].prints.last.name}
              timeLeft={0}
              finishedAt={printData?.printers[i].prints.last.finished_at}
            />
          );
          jobs.sort((a, b) =>
            a.props.finishedAt.localeCompare(b.props.finishedAt)
          );
          break;
        default:
          <div>Unusual Printer State</div>;
          break;
      }
    }
  }

  return jobs;
}
