import { useOutletContext } from "react-router";
import DashBoard from "../components/DashBoard";
import CoinsList from "../components/CoinsList";

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

export default function HomePage() {
  const { coins } = useOutletContext() as CoinTypes;

  return (
    <>
      <DashBoard coins={coins} />
      <CoinsList coins={coins} />
    </>
  );
}
