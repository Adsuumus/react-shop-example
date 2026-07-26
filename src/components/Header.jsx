import { NavLink } from "react-router-dom";
import { Cart } from "./Basket/Cart";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-lg">
      <nav className="flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-xl font-bold tracking-tight transition cursor-pointer ${
                isActive ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
              }`
            }
          >
            Магазин вещей
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition cursor-pointer ${
                isActive ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
              }`
            }
          >
            О нас
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition cursor-pointer ${
                isActive ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
              }`
            }
          >
            Связаться
          </NavLink>
        </div>
        <Cart />
      </nav>
    </header>
  );
}

export { Header };
