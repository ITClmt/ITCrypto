import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

// Types and Interfaces
type Coin = {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  image: string;
};

type Props = {
  coin: Coin;
};

type HistoricalDataPoint = {
  date: string;
  price: number;
};

type CacheData = {
  data: HistoricalDataPoint[];
  timestamp: number;
};

// Constants
const CACHE_DURATION = 900000; // 15 minute in milliseconds
const POLL_INTERVAL = 900000; // 15 minute in milliseconds

// Cache Management Functions
const createCacheKey = (coinId: string): string => `crypto-cache-${coinId}`;

const getStoredCache = (coinId: string): CacheData | null => {
  try {
    const stored = localStorage.getItem(createCacheKey(coinId));
    if (!stored) return null;

    const cache = JSON.parse(stored) as CacheData;
    const now = Date.now();

    if (now - cache.timestamp > CACHE_DURATION) {
      localStorage.removeItem(createCacheKey(coinId));
      return null;
    }

    return cache;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

const setStoredCache = (coinId: string, data: HistoricalDataPoint[]): void => {
  try {
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(createCacheKey(coinId), JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

// API Functions
const createApiUrl = (coinId: string): string =>
  `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`;

const getApiParams = () => ({
  vs_currency: "usd",
  days: 59,
  interval: "daily",
  precision: 3,
});

const processApiData = (rawData: [number, number][]): HistoricalDataPoint[] =>
  rawData
    .filter((_, index: number) => index % 7 === 0)
    .map((price: [number, number]) => ({
      date: new Date(price[0]).toLocaleDateString(),
      price: price[1],
    }));

// Component
const Cards = ({ coin }: Props) => {
  const [historicalData, setHistoricalData] = useState(
    [] as HistoricalDataPoint[],
  );
  const [loading, setLoading] = useState(true as boolean);
  const [error, setError] = useState(null as string | null);
  const pollIntervalRef = useRef(null as NodeJS.Timeout | null);

  const fetchData = async (force = false): Promise<void> => {
    if (!force) {
      const cachedData = getStoredCache(coin.id);
      if (cachedData) {
        setHistoricalData(cachedData.data);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(createApiUrl(coin.id), {
        params: getApiParams(),
      });

      const processedData = processApiData(response.data.prices);
      setStoredCache(coin.id, processedData);
      setHistoricalData(processedData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchData(false);

    pollIntervalRef.current = setInterval(() => {
      fetchData(true);
    }, POLL_INTERVAL);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [coin.id]);

  return (
    <section className="bg-neutral-800 p-4 rounded-lg">
      {loading ? (
        <p className="text-white">Loading data...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Link to={`/coins/${coin.id}`}>
              <h2 className="text-3xl font-bold text-white">{coin.name}</h2>
            </Link>
            <img src={coin.image} alt={coin.name} className="h-12" />
          </div>
          <p className="text-white text-xl">
            Current Price:{" "}
            <span className="text-3xl text-customYellow">
              ${coin.current_price.toLocaleString()}
            </span>
          </p>
          <p className="text-white text-xl">
            Market Cap: ${coin.market_cap.toLocaleString()}
          </p>
          <p
            className={`text-${
              coin.price_change_percentage_24h < 0 ? "red" : "green"
            }-500`}
          >
            24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={historicalData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#ddd" tick={{ fontSize: 10 }} />
                <YAxis stroke="#ddd" domain={["auto", "auto"]} tickCount={6} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  itemStyle={{ color: "#ddd" }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  strokeWidth={2}
                  dot={true}
                  activeDot={{ r: 8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </section>
  );
};

export default Cards;
