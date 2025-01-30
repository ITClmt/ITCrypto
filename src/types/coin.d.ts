interface Market {
  name: string;
  identifier: string;
}

interface ConvertedVolume {
  btc: number;
  eth: number;
  usd: number;
}

interface Ticker {
  base: string;
  target: string;
  market: Market;
  last: number;
  volume: number;
  converted_volume: ConvertedVolume;
  trust_score: "green" | "yellow" | "red";
  bid_ask_spread_percentage: number;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string | null;
  coin_id: string;
}

interface MarketOverviewProps {
  mainTicker: Ticker;
}
