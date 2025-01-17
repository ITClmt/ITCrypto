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
    <Link to={`/coins/${coin.id}`}>
      <article className="flex flex-col md:flex-row justify-between items-center bg-neutral-800 text-white p-3 rounded-lg mb-3 transform transition-transform hover:scale-105">
        <div className="flex flex-col md:flex-row items-center mb-2 md:mb-0 w-1/4">
          <h2 className="text-xl font-semibold pr-4 mb-2 md:mb-0">
            {coin.name}
          </h2>
          <img
            src={coin.image}
            alt={coin.name}
            className="h-10 md:h-8 md:mr-4"
          />
        </div>
        <div className="w-1/4">
          <p className="text-xl text-center md:text-left md:text-lg mb-2 md:mb-0">
            Current Price:{" "}
            <span className="text-xl text-customYellow">
              ${coin.current_price}
            </span>
          </p>
        </div>
        <div className="w-1/4 flex justify-center">
          <p className="text-lg md:text-sd text-center md:text-left mb-2 md:mb-0 lg:ml-16">
            Market Cap: ${coin.market_cap.toLocaleString()}
          </p>
        </div>
        <div className="w-1/4 flex justify-end">
          <p className="text-sm text-center md:text-left">
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
        </div>
      </article>
    </Link>
  );
}
