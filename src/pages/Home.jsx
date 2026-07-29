import { useEffect, useContext, useState } from "react";
import { ShopContext } from "../context";
import { Shop } from "../components";
import { Preloader } from "../components";
import { fetchAllItems } from "../api/itemsApi";

function Home() {
  const { goods, setGoods } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllItems()
      .then((data) => setGoods(data))
      .catch((err) => console.error("Ошибка:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <Shop goods={goods} />;
}

export { Home };
