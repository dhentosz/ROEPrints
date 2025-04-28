// Server to get API data and host static build files.

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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
const apiUrl = process.env.VITE_API_URL;
let apiKey = "";
let header = { headers: { Authorization: `Bearer ${apiKey}` } };

// fetches new token and updates auth header
async function token() {
  try {
    const BERes = await fetch(process.env.AUTH_URL);
    if (!BERes.ok) {
      throw new Error(`NetworkError-tokenrefresh: ${BERes.status}`);
    }
    apiKey = await BERes.text();
    header = { headers: { Authorization: `Bearer ${apiKey}` } };
    console.log("tokenRefreshed");
  } catch (e) {
    console.log(e);
  }
}

// initial token
token();

// sets an interval for token to be refreshed
let jwtRefresh = setInterval(token, 59000);

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
