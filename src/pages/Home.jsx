import { useEffect, useContext, useState } from "react";
import { ShopContext } from "../context";
import { Shop } from "../components";
import { fetchPage } from "../api/itemsApi";

import { useSearchParams } from "react-router-dom";

function Home() {
  const { goods, setGoods } = useContext(ShopContext);
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
    setLoading(true);
    fetchPage(currentPage, PAGE_SIZE)
      .then((result) => {
        setGoods(result.data);
        setTotalPages(result.totalPages);
      })
      .catch((err) => console.error("Ошибка:", err))
      .finally(() => setLoading(false));
  }, [currentPage]);

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
