import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";
import { Shop } from "./components/Shop";
import { Cart } from "./components/Cart";

import { Basket } from "./components/Basket";

import { useState, useEffect } from "react";
import { API_URL } from "./config";

function App() {
  const [goods, setGoods] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [showBasket, setShowBasket] = useState(false);

  const incrementItem = (id) => {
    const newOrder = order.map((el) => {
      return el.id === id ? { ...el, quantity: el.quantity + 1 } : el;
    });

    setOrder(newOrder);
  };
  const decrementItem = (id) => {
    const item = order.find((el) => el.id === id);

    if (item.quantity > 1) {
      setOrder(
        order.map((el) =>
          el.id === id ? { ...el, quantity: el.quantity - 1 } : el,
        ),
      );
    } else {
      delItem(id);
    }
  };

  const delItem = (id) => {
    const filtredOrder = order.filter((el) => el.id != id);
    setOrder(filtredOrder);
  };

  const addToBasket = (item) => {
    const existingIndex = order.findIndex((el) => el.id === item.id);

    if (existingIndex === -1) {
      setOrder([...order, { ...item, quantity: 1 }]);
      return;
    }

    setOrder(
      order.map((el, i) =>
        i === existingIndex ? { ...el, quantity: el.quantity + 1 } : el,
      ),
    );
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setGoods(data.shop));
  }, []);

  return (
    <>
      <Header />
      {showBasket ? (
        <Basket
          incrementItem={incrementItem}
          decrementItem={decrementItem}
          delItem={delItem}
          order={order}
          setShow={setShowBasket}
        />
      ) : null}

      <Cart setShow={setShowBasket} state={showBasket} order={order.length} />
      <Shop goods={goods} addToBasket={addToBasket} />
      <Footer />
    </>
  );
}

export default App;
