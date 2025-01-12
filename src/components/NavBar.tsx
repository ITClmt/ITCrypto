export default function NavBar() {
  return (
    <nav className="flex flex-col md:flex-row bg-neutral-900 p-5 md:px-28 justify-between items-center border-gray-400 border-y-2">
      <p className="text-white text-lg font-mono mb-4 md:mb-0">ITCrypto</p>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 opacity-70 rounded placeholder-black w-full md:w-auto"
      />
    </nav>
  );
}
