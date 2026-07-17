import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";
import { Shop } from "./components/Shop";
import { Cart } from "./components/Cart";

import { Basket } from "./components/Basket";

import { API_URL } from "./config";

import { useEffect, useContext } from "react";
import { ContextProvider, ShopContext } from "./context";

function AppContent() {
  const { goods, showBasket, setGoods } = useContext(ShopContext);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setGoods(data.shop));
  }, []);

  return (
    <>
      <Header />
      {showBasket ? <Basket /> : null}
      <Cart />
      <Shop goods={goods} />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ContextProvider>
      <AppContent />
    </ContextProvider>
  );
}

export default App;
