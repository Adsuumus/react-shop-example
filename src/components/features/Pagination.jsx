function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          btn btn-sm md:btn-md
          disabled:opacity-50
        "
      >
        <span className="hidden sm:inline">Назад</span>
        <span className="sm:hidden">←</span>
      </button>

      <div className="sm:hidden px-4 py-2 rounded-lg border text-sm">
        {currentPage} / {totalPages}
      </div>

      <div className="hidden sm:flex items-center gap-2">
        {getPages().map((page, index) => {
          if (page === "...") {
            return (
              <span key={index} className="px-2">
                ...
              </span>
            );
          }

          return (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`
                btn btn-sm md:btn-md
                ${currentPage === page ? "btn-soft" : ""}
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          btn btn-sm md:btn-md
          disabled:opacity-50
        "
      >
        <span className="hidden sm:inline">Вперед</span>
        <span className="sm:hidden">→</span>
      </button>
    </div>
  );
}

export { Pagination };
