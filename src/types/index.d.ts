interface CoinData {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
  };
  tickers: Ticker[];
}

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

interface Coin {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  image: string;
}

interface CoinItemProps {
  coin: Coin;
}

type Props = {
  coin: Coin;
};

type HistoricalDataPoint = {
  date: string;
  price: number;
};

type CacheData = {
  data: HistoricalDataPoint[];
  timestamp: number;
};
