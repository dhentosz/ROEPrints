// Pulls current printer data from the Carbon3D API

import { useState, useEffect } from "react";
import { AllPrinterData } from "./CarbonDataInterfaces";
import CarbonJobs from "./CarbonJobs";

// Interface to explicitly define prop types
interface Props {
  printState: string;
}

export default function CarbonAPI({ printState }: Props) {
  // State variables for the API response, loading, and errors
  const [printData, setPrintData] = useState<AllPrinterData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API Call
  useEffect(() => {
    // Function to fetch API data and store into state variable printData
    const gatherData = async () => {
      const carbonUrl = import.meta.env.VITE_FRONTEND_URL;

      try {
        const response = await fetch(carbonUrl);
        if (!response.ok) {
          throw new Error(`FECarbonCall-NetworkError: ${response.status}`);
        }
        const data = await response.json();

        setPrintData(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    // Initial data pull
    gatherData();

    // Sets refresh interval to continuously pull data.
    const interval = setInterval(() => {
      gatherData();
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  // State management blocks to handle loading, error, and data display states
  if (loading) {
    return <p>Loading Data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (printData) {
    return CarbonJobs(printData, printState);
  }
}
