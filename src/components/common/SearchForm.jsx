import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SearchForm() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/search") {
      setQuery("");
    }
  }, [location.pathname]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск товаров"
        className="w-full px-4 py-2 bg-gray-800 text-gray-200 placeholder-gray-400 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
      />

      <button
        type="submit"
        className="absolute right-0 top-0 h-full w-10 cursor-pointer"
      >
        <svg
          className="w-5 h-5 text-gray-400 mx-auto"
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
      </button>
    </form>
  );
}

export { SearchForm as Search };
