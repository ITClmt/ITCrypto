import axios from "axios";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

interface coinTypes {
  coin: {
    id: string;
    name: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
    image: string;
  };
}

export default function Cards({ coin }: coinTypes) {
  const [historicalData, setHistoricalData] = useState<
    { date: string; price: number }[]
  >([]);
  const apiUrl = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart`;
  const params = {
    vs_currency: "usd",
    days: 59,
    interval: "daily",
    precision: 3,
  };

  useEffect(() => {
    axios.get(apiUrl, { params }).then((res) => {
      const filteredData = res.data.prices
        .filter((_: number, index: number) => index % 7 === 0)
        .map((price: [number, number]) => ({
          date: new Date(price[0]).toLocaleDateString(),
          price: price[1],
        }));
      setHistoricalData(filteredData);
      console.info(filteredData);
    });
  }, [apiUrl]);

  return (
    <section className="bg-neutral-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-white">{coin.name}</h2>
        <img src={coin.image} alt={coin.name} className="h-12" />
      </div>
      <p className="text-white text-xl">
        Current Price:{" "}
        <span className="text-3xl text-yellow-300">${coin.current_price}</span>
      </p>
      <p className="text-white text-xl">
        Market Cap: ${coin.market_cap.toLocaleString()}
      </p>
      <p className="text-white text-xl">
        24h Change: {coin.price_change_percentage_24h}%
      </p>
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={historicalData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
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
    </section>
  );
}
