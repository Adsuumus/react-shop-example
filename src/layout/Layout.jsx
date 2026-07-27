import { Header, Footer } from "../components";
import { Outlet, ScrollRestoration } from "react-router-dom";

import { useContext } from "react";
import { ShopContext } from "../context";

import { Basket } from "../components";

function Layout() {
  const { showBasket } = useContext(ShopContext);

  return (
    <>
      <ScrollRestoration />
      {showBasket ? <Basket /> : null}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export { Layout };
