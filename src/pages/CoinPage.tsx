import { useLoaderData } from "react-router";
import MainDetails from "../components/MainDetails";

export default function CoinPage() {
  const coinData = useLoaderData() as CoinData;
  if (!coinData) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return <MainDetails coinData={coinData} />;
}
