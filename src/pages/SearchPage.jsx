import { useEffect, useContext, useState } from "react";
import { ShopContext } from "@/context";
import { Shop } from "@/components";
import { searchAPI } from "@/api";
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const { goods, setGoods } = useContext(ShopContext);

  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const PAGE_SIZE = 4;

  useEffect(() => {
    async function loadGoods() {
      setLoading(true);

      try {
        const products = await searchAPI(query);

        setGoods(products);
      } catch (error) {
        console.error("Ошибка поиска:", error);
      } finally {
        setLoading(false);
      }
    }

    if (query.trim()) {
      loadGoods();
    } else {
      setGoods([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <Shop
      loading={loading}
      goods={goods}
      currentPage={1}
      totalPages={1}
      onPageChange={() => {}}
      pageSize={PAGE_SIZE}
    />
  );
}

export { SearchPage };
