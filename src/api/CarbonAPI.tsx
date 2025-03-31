// Pulls current printer data from the Carbon3D API

import { useState, useEffect } from "react";
import Job from "../elements/Job";

// Interfaces to explicitly define objects to hold the printer data fetched from API
interface PrintReference {
  name: string;
  print_id: string;
  build_uuid: string;
  finished_at: string;
  started_at: string;
  remaining_sec: number;
}

interface Printer {
  alias: string;
  name: string;
  serial: string;
  hw_type: string;
  url: string;
  updated_at: string;
  status: {
    alerts: Array<string>;
    printer_state: string;
    software_version: string;
  };
  prints: {
    last: PrintReference;
    current: PrintReference;
    next: PrintReference;
    queue_length: number;
  };
}

interface AllPrinterData {
  limit: number;
  offset: number;
  total_count: number;
  printers: Printer[];
}

// Interface to explicitly define prop types
interface Props {
  printState: string;
}

export default function CarbonAPI({ printState }: Props) {
  // State variables for the API response, loading, and errors
  const [printData, setPrintData] = useState<AllPrinterData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API URL and Key variables
  const apiUrl = import.meta.env.VITE_FRONTEND_URL;

  // ** Variables to be removed once backend server integration finalized **
  // const apiKey = import.meta.env.VITE_API_KEY;
  // // Header to be passed with fetch call for API request
  // const header = { headers: { Authorization: `Bearer ${apiKey}` } };

  // Empty array for Job components to be gathered
  const jobs: JSX.Element[] = [];

  // API Call
  useEffect(() => {
    // Function to fetch API data and store into state variable printData
    const gatherData = async () => {
      try {
        await fetch(apiUrl)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Network Error: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            setPrintData(data);
          });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    // Sets refresh interval to continuously pull data.
    const interval = setInterval(() => {
      gatherData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // State management blocks to handle loading, error, and data display states
  if (loading) {
    return <p>Loading Data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Handles data dependent upon printState prop passed from parent and builds/sorts array of Jobs to pass back accordingly
  if (printData) {
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
  }

  // Return sorted array of jobs to parent.
  return jobs;
}
