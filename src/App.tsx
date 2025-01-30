import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import axios from "axios";
import { Outlet } from "react-router";

const CACHE_KEY = "coingecko_data";
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

const params = {
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: 200,
  page: 1,
  sparkline: false,
};

const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";

function App() {
  const [coins, setCoins] = useState([] as Coin[]);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl, { params });
      const currentTime = new Date().getTime();

      // Store data and timestamp in localStorage
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: response.data,
          timestamp: currentTime,
        }),
      );

      setCoins(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const currentTime = new Date().getTime();

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);

      // Check if cache is still valid (less than 15 minutes old)
      if (currentTime - timestamp < CACHE_DURATION) {
        setCoins(data);
        return;
      }
    }

    // Fetch new data if cache is expired or doesn't exist
    fetchData();
  }, []);

  return (
    <>
      <NavBar coins={coins} />
      <main>
        <Outlet context={{ coins }} />
      </main>
    </>
  );
}

export default App;
