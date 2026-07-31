import { useEffect, useContext, useState } from "react";
import { ShopContext } from "../context";
import { Shop } from "../components";
import { Preloader } from "../components";
import { fetchPage } from "../api/itemsApi";

import { useSearchParams } from "react-router-dom";

function Home() {
  const { goods, setGoods } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);

  function changePage(page) {
    console.log("change page:", page);
    setSearchParams({
      page: page,
    });
  }

  useEffect(() => {
    setLoading(true);
    fetchPage(currentPage)
      .then((result) => {
        setGoods(result.data);
        setTotalPages(result.totalPages);
      })
      .catch((err) => console.error("Ошибка:", err))
      .finally(() => setLoading(false));
  }, [currentPage]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Shop
      goods={goods}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={changePage}
    />
  );
}

export { Home };
