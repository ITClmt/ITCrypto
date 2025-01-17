import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav className="flex flex-col md:flex-row bg-neutral-900 p-5 md:px-28 justify-between items-center border-gray-400 border-y-2">
      <Link to="/">
        <p className="text-white text-2xl font-mono mb-4 md:mb-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-2 rounded shadow-lg">
          ITCrypto
        </p>
      </Link>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 opacity-70 rounded placeholder-black w-full md:w-auto"
      />
    </nav>
  );
}
