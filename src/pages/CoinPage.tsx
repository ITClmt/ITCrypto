import { useLoaderData } from "react-router";
import MainDetails from "../components/MainDetails";
import ChartsCoinPages from "../components/ChartsCoinPages";
import MarketOverview from "../components/MarketOverview";

export default function CoinPage() {
  const coinData = useLoaderData() as CoinData;
  console.info(coinData);

  if (!coinData) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  const tickers = coinData.tickers || [];
  const mainTicker = tickers[0] || {};

  return (
    <div className="min-h-screen bg-neutral-900 py-8 px-4">
      <MainDetails coinData={coinData} />
      <ChartsCoinPages />
      <MarketOverview mainTicker={mainTicker} />
    </div>
  );
}
