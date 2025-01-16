import { useLoaderData } from "react-router";

interface CoinData {
  name: string;
  id: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
}

export default function CoinPage() {
  const coinData = useLoaderData() as CoinData;

  return (
    <div className="bg-neutral-900 text-white p-5 rounded-lg shadow-md container mx-auto my-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{coinData.name}</h1>
        <img src={coinData.image.large} alt={coinData.name} className="h-20" />
      </div>
      <p className="text-lg">
        Current Price:{" "}
        <span className="text-2xl text-yellow-300">
          ${coinData.market_data.current_price.usd}
        </span>
      </p>
      <p className="text-lg">
        Market Cap: ${coinData.market_data.market_cap.usd.toLocaleString()}
      </p>
      <p className="text-lg">
        24h Change:{" "}
        <span
          className={
            coinData.market_data.price_change_percentage_24h < 0
              ? "text-red-500"
              : "text-green-500"
          }
        >
          {coinData.market_data.price_change_percentage_24h}%
        </span>
      </p>
    </div>
  );
}
