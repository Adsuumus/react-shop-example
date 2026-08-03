function Search() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Поиск товаров"
        className="w-full px-4 py-2 bg-gray-800 text-gray-200 placeholder-gray-400 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
      />

      <svg
        className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}

export { Search };
