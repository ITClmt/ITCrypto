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

const apiUrl = "http://localhost:5000/api/v3/coins/markets";

function App() {
  const [coins, setCoins] = useState([] as CoinTypes[]);

  useEffect(() => {
    axios
      .get(apiUrl)
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
