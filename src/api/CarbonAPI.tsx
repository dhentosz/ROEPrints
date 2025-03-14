// Pulls current printer data from the Carbon3D API

import { useState, useEffect } from "react";

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

export default function CarbonAPI() {
  // State variables for the API response, loading, and errors
  const [printData, setPrintData] = useState<AllPrinterData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API key and URL variables
  const apiUrl = "";
  const apiKey = "";

  // Header to be passed with fetch call for API request
  const header = { headers: { Authorization: `Bearer ${apiKey}` } };

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
    return <p>Loading Data</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <div>{printData?.printers[3].alias}</div>;
}
