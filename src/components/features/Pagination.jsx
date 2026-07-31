function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Назад */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          px-3 py-2 text-sm font-medium
          text-gray-700 bg-white
          border border-gray-300
          rounded-lg
          hover:bg-gray-100
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition
        "
      >
        Назад
      </button>

      {/* Страницы */}
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-3 py-2 text-sm font-medium rounded-lg transition
              ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            {page}
          </button>
        );
      })}

      {/* Вперед */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          px-3 py-2 text-sm font-medium
          text-gray-700 bg-white
          border border-gray-300
          rounded-lg
          hover:bg-gray-100
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition
        "
      >
        Вперед
      </button>
    </div>
  );
}

export { Pagination };
