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

  // API key and URL variables
  const apiUrl = "";
  const apiKey = "";

  // Header to be passed with fetch call for API request
  const header = { headers: { Authorization: `Bearer ${apiKey}` } };

  // Array of Job components to be gatehred and passed back to parent
  const jobs: JSX.Element[] = [];

  // Function to fetch API data and store into state variable printData
  const gatherData = async () => {
    try {
      fetch(apiUrl, header)
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

  // API Call
  useEffect(() => {
    gatherData();
  }, []);

  // State management blocks to handle loading, error, and data display states
  if (loading) {
    return <p>Loading Data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Handles data dependent upon printState prop passed from parent and builds array of Jobs to pass back
  if (printData) {
    for (let i = 0; i < printData?.total_count; i++) {
      if (printState === printData?.printers[i].status.printer_state) {
        jobs.push(
          <Job
            printerName={printData?.printers[i].alias}
            jobName={printData?.printers[i].prints.current.name}
          />
        );
      }
    }
  }

  return jobs;
}
