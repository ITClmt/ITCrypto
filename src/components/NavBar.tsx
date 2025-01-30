import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function NavBar({ coins }: { coins: Coin[] }) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Coin[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.length > 1) {
      const filteredSuggestions = coins.filter((coin) =>
        coin.name.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (coin: Coin) => {
    setSearch(coin.name);
    setShowSuggestions(false);
    navigate(`/coins/${coin.id}`);
  };

  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="flex flex-col md:flex-row bg-neutral-900 p-5 md:px-28 justify-between items-center border-gray-400 border-y-2">
      <Link to="/">
        <p className="text-white text-2xl font-mono mb-4 md:mb-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-2 rounded shadow-lg">
          ITCrypto
        </p>
      </Link>
      <div className="relative w-full md:w-auto">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 opacity-70 rounded placeholder-black w-full"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && suggestions.length > 0) {
              handleSuggestionClick(suggestions[0]);
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowSuggestions(true);
          }}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute w-full bg-white mt-1 rounded shadow-lg">
            {suggestions.map((coin) => (
              <button
                key={coin.id}
                className="w-full text-left p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(coin)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSuggestionClick(coin);
                  }
                }}
                tabIndex={0}
                type="button"
              >
                <div className="flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  <span>{coin.name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
