import { useEffect, useContext } from "react";
import { ShopContext } from "../context";
import { API_URL } from "../config";
import { Shop } from "../components";
import { fetchAllItems } from "../api/testApi";

function Home() {
  const { goods, setGoods } = useContext(ShopContext);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setGoods(data.shop));
  }, []);

  //   useEffect(() => {
  //   async function loadItems() {
  //     try {
  //       const data = await fetchAllItems();
  //       setGoods(data);
  //     } catch (error) {
  //       console.error("Ошибка загрузки:", error);
  //       setGoods([]);
  //     }
  //   }

  //   loadItems();
  // }, []);

  return (
    <>
      <Shop goods={goods} />
    </>
  );
}

export { Home };
