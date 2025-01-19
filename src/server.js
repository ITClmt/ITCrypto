import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize dotenv before accessing env variables
dotenv.config();

// Verify API key exists
if (!process.env.API_KEY) {
  console.error("Missing API_KEY in environment variables");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Route to fetch market chart data for a specific coin
app.get("/api/v3/coins/:coinId/market_chart", async (req, res) => {
  try {
    const { coinId } = req.params;
    const { vs_currency, days, interval, precision } = req.query;

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency,
          days,
          interval,
          precision,
          x_cg_demo_api_key: process.env.API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching market chart data:", error);

    const status = error.response?.status || 500;
    const message = error.response?.data?.error || "Internal server error";

    res.status(status).json({
      error: message,
      status: status,
    });
  }
});

// Route to fetch markets data
app.get("/api/v3/coins/markets", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
          x_cg_demo_api_key: process.env.API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching markets data:", error);

    const status = error.response?.status || 500;
    const message = error.response?.data?.error || "Internal server error";

    res.status(status).json({
      error: message,
      status: status,
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
