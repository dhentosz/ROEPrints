// Server to get API data and host static build files.

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: "../.env" });

// express app and port
const app = express();
const port = process.env.PORT;

// configure cors to accept requests from only dev server of ROEPrints
const clientOrigin = process.env.ORIGIN_URL;
app.use(
  cors({
    origin: clientOrigin,
  })
);

// Gathers directory paths for current and parent directories.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const parentDir = path.dirname(__dirname);

// API variables
const apiUrl = process.env.VITE_API_URL;
const apiKey = process.env.VITE_API_KEY;

// Header to be passed with fetch call for API request
const header = { headers: { Authorization: `Bearer ${apiKey}` } };

app.use(express.static(path.join(parentDir, "/dist")));

app.get("/api/carbon", (req, res) => {
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

// To be used for static files
app.get("/", (req, res) => {
  res.sendFile(path.join(parentDir, "/dist/index.html"));
});

app.listen(port, () => {
  console.log("server running");
});
