import { Header, Footer } from "../components";
import { Outlet, ScrollRestoration } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 ">
      <ScrollRestoration />
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export { Layout };
