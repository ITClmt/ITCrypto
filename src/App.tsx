import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import axios from "axios";
import { Outlet } from "react-router";

const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";
const params = {
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: 10,
  page: 1,
  sparkline: false,
};

function App() {
  const [coins, setCoins] = useState([] as []);

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
      <Outlet context={{ coins }} />
    </>
  );
}

export default App;
