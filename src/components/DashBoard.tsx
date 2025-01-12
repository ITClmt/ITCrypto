import Cards from "./Cards";

interface CoinTypes {
  coins: [
    {
      id: string;
      name: string;
      current_price: number;
      market_cap: number;
      price_change_percentage_24h: number;
      image: string;
    },
  ];
}

export default function DashBoard({ coins }: CoinTypes) {
  return (
    <main className="bg-neutral-900 text-white font-mono p-5 container mx-auto my-2 rounded-lg">
      <h1 className="text-6xl p-6">Top Crypto</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {coins.slice(0, 3).map((coin) => (
          <Cards key={coin.id} coin={coin} />
        ))}
      </div>
    </main>
  );
}
