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
import { useHistoricalData } from "../hooks/useHistoricalData";

// Component
const Cards = ({ coin }: Props) => {
  const { historicalData, loading, error } = useHistoricalData(coin.id);

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
