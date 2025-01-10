export default function NavBar() {
  return (
    <nav className="flex bg-neutral-900 p-5 px-28 justify-between border-gray-400 border-y-2">
      <p className="text-white text-lg font-mono">ITCrypto</p>
      <input
        type="text"
        placeholder="Search..."
        className="p-1 opacity-40 rounded placeholder-black"
      />
    </nav>
  );
}
