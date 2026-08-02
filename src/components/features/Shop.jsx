import { Item } from "./Item";
import { Skeleton } from "./Skeleton";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: pageSize }).map((_, i) => <Skeleton key={i} />)
          : goods.map((item) => <Item key={item.id} {...item} />)}
      </div>

      <Pagination
        onPageChange={onPageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}

export { Shop };
