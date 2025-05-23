// Server to get API data and host static build files.

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import * as util from "./utilities/index.js";

dotenv.config({ path: "../.env" });

// express app and port
const app = express();
const port = process.env.FE_PORT;

// Gathers directory paths for current and parent directories.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "/dist")));

// configure cors to accept requests from only dev server of ROEPrints
const clientOrigin = process.env.ORIGIN_URL;
app.use(
  cors({
    origin: clientOrigin,
  })
);

// CarbonAPI variables
const apiUrl = process.env.CARBON_URL;
let header = await util.getCarbonHeader();

// fetches new auth header for CarbonAPI
async function authHeader() {
  header = await util.getCarbonHeader();
}

// sets an interval for token to be refreshed
let jwtInterval = setInterval(authHeader, 780000);

// CarbonPrints endpoint
app.get("/carbon/prints", async (req, res) => {
  res.send(await util.getCarbonPrints(apiUrl, header));
});

// Hosts built static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.listen(port, () => {
  console.log(`server running: ${port}`);
});
