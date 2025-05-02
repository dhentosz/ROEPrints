// Server to get API data and host static build files.

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { getCarbonHeader } from "./carbonHeader.js";

dotenv.config({ path: "../.env" });

// express app and port
const app = express();
const port = process.env.FE_PORT;

// Gathers directory paths for current and parent directories.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const parentDir = path.dirname(__dirname);

app.use(express.static(path.join(parentDir, "/dist")));

// configure cors to accept requests from only dev server of ROEPrints
const clientOrigin = process.env.ORIGIN_URL;
app.use(
  cors({
    origin: clientOrigin,
  })
);

// CarbonAPI variables
const apiUrl = process.env.CARBON_URL;
let header = await getCarbonHeader();

// fetches new auth header for CarbonAPI
async function authHeader() {
  header = await getCarbonHeader();
}

// sets an interval for token to be refreshed
let jwtInterval = setInterval(authHeader, 780000);

// CarbonPrints endpoint
app.get("/carbon/prints", (req, res) => {
  try {
    fetch(apiUrl, header)
      .then((apiRes) => {
        if (!apiRes.ok) {
          throw new Error(`Network Error: ${apiRes.status}`);
        }
        return apiRes.json();
      })
      .then((data) => {
        res.send(data);
      });
  } catch (e) {
    console.log(e);
  }
});

// Hosts built static files
app.get("/", (req, res) => {
  res.sendFile(path.join(parentDir, "/dist/index.html"));
});

app.listen(port, () => {
  console.log(`server running: ${port}`);
});
