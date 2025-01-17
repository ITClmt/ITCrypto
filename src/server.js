import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const app = express();
const PORT = 5000;
const API_KEY = process.env.API_KEY; // Ensure your API key is stored in an environment variable

// Enable CORS
app.use(cors());

// Proxy middleware
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api.coingecko.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // remove /api prefix when forwarding to target
    },
    onProxyReq: (proxyReq, req, res) => {
      // Add API key to the query parameters
      const newUrl = new URL(proxyReq.path, "https://api.coingecko.com");
      newUrl.searchParams.append("api_key", API_KEY);
      proxyReq.path = newUrl.pathname + newUrl.search;
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
