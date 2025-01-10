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
  return (
    <section className="bg-neutral-800 p-4 rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl">{coin.name}</h2>
        <img src={coin.image} alt={coin.name} className="h-12" />
      </div>
      <p>Current Price: ${coin.current_price}</p>
      <p>Market Cap: ${coin.market_cap}</p>
      <p>24h Change: {coin.price_change_percentage_24h}%</p>
    </section>
  );
}
