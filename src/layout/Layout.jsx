import { Header, Footer } from "../components";
import { Outlet, ScrollRestoration } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export { Layout };
