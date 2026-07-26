import { useEffect, useContext } from "react";
import { ShopContext } from "../context";
import { API_URL } from "../config";
import { Shop } from "../components";
import { Preloader } from "../components/Preloader";

function Home() {
  const { goods, setGoods } = useContext(ShopContext);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setGoods(data.shop));
  }, []);

  return (
    <>
      <Shop goods={goods} />
    </>
  );
}

export { Home };
