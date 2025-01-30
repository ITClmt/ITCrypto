export default function MarketOverview({ mainTicker }: MarketOverviewProps) {
  return (
    <div className="container mx-auto bg-neutral-800 rounded-lg p-6 mb-8 mt-10 ">
      <h2 className="text-2xl font-bold text-white mb-6">Market Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Volume Information */}
        <div className="bg-neutral-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">
            Trading Volume (24h)
          </h3>
          <div className="space-y-2">
            <p className="text-white flex justify-between">
              <span>USD:</span>
              <span className="text-customYellow">
                ${mainTicker.converted_volume?.usd?.toLocaleString() || "N/A"}
              </span>
            </p>
            <p className="text-white flex justify-between">
              <span>BTC:</span>
              <span className="text-customYellow">
                {mainTicker.converted_volume?.btc?.toLocaleString() || "N/A"}{" "}
                BTC
              </span>
            </p>
            <p className="text-white flex justify-between">
              <span>ETH:</span>
              <span className="text-customYellow">
                {mainTicker.converted_volume?.eth?.toLocaleString() || "N/A"}{" "}
                ETH
              </span>
            </p>
          </div>
        </div>

        {/* Market Health */}
        <div className="bg-neutral-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">
            Market Health
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white">Trust Score:</span>
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${
                  mainTicker.trust_score === "green"
                    ? "bg-green-500"
                    : mainTicker.trust_score === "yellow"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              >
                {mainTicker.trust_score?.toUpperCase() || "N/A"}
              </span>
            </div>
            <p className="text-white flex justify-between">
              <span>Bid/Ask Spread:</span>
              <span className="text-customYellow">
                {mainTicker.bid_ask_spread_percentage?.toFixed(3)}%
              </span>
            </p>
            {mainTicker.is_anomaly && (
              <div className="bg-red-500/20 text-red-400 p-2 rounded text-sm">
                ⚠️ Market Anomaly Detected
              </div>
            )}
          </div>
        </div>

        {/* Trading Information */}
        <div className="bg-neutral-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">
            Trading Info
          </h3>
          <div className="space-y-2">
            <p className="text-white flex justify-between">
              <span>Last Trade:</span>
              <span className="text-customYellow">
                {new Date(mainTicker.last_traded_at).toLocaleString()}
              </span>
            </p>
            <p className="text-white flex justify-between">
              <span>Last Update:</span>
              <span className="text-customYellow">
                {new Date(mainTicker.last_fetch_at).toLocaleString()}
              </span>
            </p>
            {mainTicker.trade_url && (
              <a
                href={mainTicker.trade_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center bg-customYellow text-neutral-900 px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
              >
                Trade on {mainTicker.market?.name}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
