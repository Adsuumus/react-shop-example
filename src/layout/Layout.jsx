import { Header, Footer } from "../components";
import { Outlet, ScrollRestoration } from "react-router-dom";

function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export { Layout };
