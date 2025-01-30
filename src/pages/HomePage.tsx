import { useOutletContext } from "react-router";
import DashBoard from "../components/DashBoard";
import CoinsList from "../components/CoinsList";

export default function HomePage() {
  const { coins } = useOutletContext() as CoinTypes;

  return (
    <>
      <DashBoard coins={coins} />
      <CoinsList coins={coins} />
    </>
  );
}
