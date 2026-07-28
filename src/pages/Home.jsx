import { useEffect, useContext } from "react";
import { ShopContext } from "../context";
import { Shop } from "../components";
import { fetchAllItems } from "../api/itemsApi";

function Home() {
  const { goods, setGoods } = useContext(ShopContext);

  useEffect(() => {
    fetchAllItems()
      .then((data) => setGoods(data))
      .catch((err) => console.error("Ошибка:", err));
  }, []);

  return <Shop goods={goods} />;
}

export { Home };
