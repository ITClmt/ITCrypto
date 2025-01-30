export default function MainDetails({ coinData }: { coinData: CoinData }) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={coinData.image.large}
              alt={coinData.name}
              className="h-16 w-16"
            />
            <h1 className="text-4xl font-bold text-white">{coinData.name}</h1>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-white">
              ${coinData.market_data.current_price.usd.toLocaleString()}
            </p>
            <p
              className={`text-lg font-semibold ${
                coinData.market_data.price_change_percentage_24h < 0
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {coinData.market_data.price_change_percentage_24h > 0 ? "+" : ""}
              {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Statistics */}
        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">
            Market Statistics
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Market Cap</span>
              <span className="text-white font-medium">
                ${coinData.market_data.market_cap.usd.toLocaleString()}
              </span>
            </div>
            <div className="h-px bg-neutral-700" />
            <div className="flex justify-between">
              <span className="text-gray-400">24h Change</span>
              <span
                className={`font-medium ${
                  coinData.market_data.price_change_percentage_24h < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">
            About {coinData.name}
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {`${coinData.description.en.split(". ").slice(0, 3).join(". ")}.`}
          </p>
        </div>
      </div>
    </div>
  );
}
