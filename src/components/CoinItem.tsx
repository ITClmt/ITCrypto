import { Link } from "react-router";

interface Coin {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  image: string;
}

interface CoinItemProps {
  coin: Coin;
}

export default function CoinItem({ coin }: CoinItemProps) {
  return (
    <article className="bg-neutral-800 text-white p-3 rounded-lg mb-3 shadow-md transform transition-transform hover:scale-105">
      <Link to={`/coins/${coin.id}`}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">{coin.name}</h2>
          <img src={coin.image} alt={coin.name} className="h-10" />
        </div>
        <p className="text-sm">
          Current Price:{" "}
          <span className="text-lg text-yellow-300">${coin.current_price}</span>
        </p>
        <p className="text-sm">
          Market Cap: ${coin.market_cap.toLocaleString()}
        </p>
        <p className="text-sm">
          24h Change:{" "}
          <span
            className={
              coin.price_change_percentage_24h < 0
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {coin.price_change_percentage_24h}%
          </span>
        </p>
      </Link>
    </article>
  );
}
