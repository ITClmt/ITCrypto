import { useEffect, useState } from "react";
import DashBoard from "./components/DashBoard";
import NavBar from "./components/NavBar";
import axios from "axios";

const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";
const params = {
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: 10,
  page: 1,
  sparkline: false,
};

interface Coin {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  image: string;
}

function App() {
  const [coins, setCoins] = useState([] as Coin[]);

  useEffect(() => {
    axios
      .get(apiUrl, { params })
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));
  }, []);
  console.info(coins);

  return (
    <>
      <NavBar />
      <DashBoard coins={coins} />
    </>
  );
}

export default App;
