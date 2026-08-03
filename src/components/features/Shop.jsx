import { Item } from "./Item";
import { StoreSkeleton } from "./StoreSkeleton";
import { Pagination } from "./Pagination";

function Shop({
  goods = [],
  currentPage,
  totalPages,
  onPageChange,
  loading,
  pageSize,
}) {
  return (
    <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-8">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: pageSize }).map((_, i) => (
            <StoreSkeleton key={i} />
          ))}
        </div>
      ) : goods.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {goods.map((item) => (
              <Item key={item.id} {...item} />
            ))}
          </div>

          <Pagination
            onPageChange={onPageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <h2 className="text-center text-xl font-semibold text-gray-400 py-10">
          Товары не найдены
        </h2>
      )}
    </main>
  );
}

export { Shop };
