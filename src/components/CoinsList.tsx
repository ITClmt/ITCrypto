import CoinItem from "./CoinItem";
import { useState } from "react";

export default function CoinsList({ coins }: CoinTypes) {
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 20;

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  return (
    <section className="flex flex-col bg-neutral-900 text-white font-mono p-5 container mx-auto my-2 rounded-lg">
      <h2 className="text-4xl p-6">Top 200:</h2>
      {currentCoins.map((coin) => (
        <CoinItem key={coin.id} coin={coin} />
      ))}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(coins.length / coinsPerPage) }).map(
          (_, index) => (
            <button
              type="button"
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded  ${
                currentPage === index + 1 ? "bg-blue-500" : "bg-neutral-800"
              }`}
            >
              {index + 1}
            </button>
          ),
        )}
      </div>
    </section>
  );
}
