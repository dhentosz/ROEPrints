// Interfaces to explicitly define objects to hold the printer data fetched from CarbonAPI

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
  
export interface AllPrinterData {
    limit: number;
    offset: number;
    total_count: number;
    printers: Printer[];
  }