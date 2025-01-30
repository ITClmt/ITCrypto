import { useState, useEffect, useRef } from "react";
import axios from "axios";

// Constants
const CACHE_DURATION = 900000; // 15 minute in milliseconds
const POLL_INTERVAL = 900000; // 15 minute in milliseconds

// Types

// Cache Management Functions
const createCacheKey = (coinId: string) => `crypto-cache-${coinId}`;

const getStoredCache = (coinId: string) => {
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

const setStoredCache = (coinId: string, data: HistoricalDataPoint[]) => {
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
const createApiUrl = (coinId: string) =>
  `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`;

const getApiParams = () => ({
  vs_currency: "usd",
  days: 59,
  interval: "daily",
  precision: 3,
});

const processApiData = (rawData: [number, number][]) =>
  rawData
    .filter((_, index: number) => index % 7 === 0)
    .map((price: [number, number]) => ({
      date: new Date(price[0]).toLocaleDateString(),
      price: price[1],
    }));

export const useHistoricalData = (coinId: string) => {
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async (force = false): Promise<void> => {
    if (!force) {
      const cachedData = getStoredCache(coinId);
      if (cachedData) {
        setHistoricalData(cachedData.data);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(createApiUrl(coinId), {
        params: getApiParams(),
      });

      const processedData = processApiData(response.data.prices);
      setStoredCache(coinId, processedData);
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
  }, [coinId]);

  return { historicalData, loading, error };
};
