import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import axios from "axios";
import { Outlet } from "react-router";

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

const apiUrl =
  "https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=CG-nFXv6294Yg9rtNDczxF13idZ";
const params = {
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: 100,
  page: 1,
  sparkline: false,
};

function App() {
  const [coins, setCoins] = useState([] as CoinTypes[]);

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
      <main>
        <Outlet context={{ coins }} />
      </main>
    </>
  );
}

export default App;
