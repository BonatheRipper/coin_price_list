const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // Use node-fetch instead of request
const app = express();

app.use(cors()); // Enable CORS for all routes

// Proxy route
app.get("/proxy", async (req, res) => {
  const apiUrl = "https://api.coinranking.com/v2/coins";
  const apiKey = process.env.COINAPI; // Replace with your actual API key

  try {
    // Fetch data from the CoinRanking API
    const response = await fetch(apiUrl, {
      headers: { "x-access-token": apiKey },
    });
    const data = await response.json();

    // Send the API response back to the frontend
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Start the proxy server
app.listen(3000, () => {
  console.log("CORS Proxy server is running on port 3000");
});
