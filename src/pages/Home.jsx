import { useEffect, useContext, useState } from "react";
import { ShopContext } from "../context";
import { Shop } from "../components";
import { fetchPage, searchAPI } from "../api/index.js";

import { useSearchParams } from "react-router-dom";

function Home() {
  const { goods, setGoods, searchQuery } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 8;

  function changePage(page) {
    setSearchParams({
      page: page,
    });
  }

  useEffect(() => {
    async function loadGoods() {
      setLoading(true);

      try {
        if (searchQuery.trim()) {
          const products = await searchAPI(searchQuery);

          setGoods(products);
          setTotalPages(1);
        } else {
          const result = await fetchPage(currentPage, PAGE_SIZE);

          setGoods(result.data);
          setTotalPages(result.totalPages);
        }
      } catch (error) {
        console.error("Ошибка:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGoods();
  }, [currentPage, searchQuery]);

  return (
    <Shop
      loading={loading}
      goods={goods}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={changePage}
      pageSize={PAGE_SIZE}
    />
  );
}

export { Home };
