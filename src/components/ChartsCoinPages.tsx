import { useParams } from "react-router";
import { useHistoricalData } from "../hooks/useHistoricalData";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

export default function ChartsCoinPages() {
  const { id } = useParams();
  const { historicalData, loading, error } = useHistoricalData(id || "");

  if (loading) {
    return <div className="text-white">Loading chart data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading chart: {error}</div>;
  }

  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg mb-6 container mx-auto mt-10">
      <h2 className="text-2xl font-bold text-white mb-4">Price History</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={historicalData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="date"
              stroke="#ddd"
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              stroke="#ddd"
              domain={["auto", "auto"]}
              tickCount={8}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", border: "none" }}
              itemStyle={{ color: "#ddd" }}
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                "Price",
              ]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#82ca9d"
              fill="#82ca9d"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
