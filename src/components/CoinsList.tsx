import CoinItem from "./CoinItem";

interface CoinTypes {
  coins: {
    id: string;
    name: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
    image: string;
  }[];
}

export default function CoinsList({ coins }: CoinTypes) {
  return (
    <section className="flex flex-col bg-neutral-900 text-white font-mono p-5 container mx-auto my-2 rounded-lg">
      <h2 className="text-4xl p-6">Top 100:</h2>
      {coins.map((coin) => (
        <CoinItem key={coin.id} coin={coin} />
      ))}
    </section>
  );
}
