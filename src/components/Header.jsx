import { NavLink } from "react-router-dom";
import { Cart } from "./Basket/Cart";

import { Search } from "./Search";

function Header() {
  const navClass = ({ isActive }) =>
    `whitespace-nowrap transition cursor-pointer ${
      isActive ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <nav className="px-4 md:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Левое меню */}
          <div className="basis-[350px] min-w-min justify-start flex items-center gap-4 md:gap-8 min-w-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navClass({ isActive })} text-lg md:text-xl font-bold tracking-tight`
              }
            >
              Магазин вещей
            </NavLink>

            <NavLink to="/about" className={navClass}>
              О нас
            </NavLink>

            <NavLink to="/contact" className={navClass}>
              Связаться
            </NavLink>
          </div>

          {/* Поиск на компьютере */}
          <div className="hidden md:block justify-center flex-1 max-w-[700px] min-w-[300px]">
            <Search />
          </div>

          {/* Правая часть */}
          <div className="basis-[350px] min-w-min shrink justify-end flex items-center gap-4 md:gap-8 min-w-0">
            <button className="cursor-pointer px-4 py-2 text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition border border-gray-700 hover:border-gray-600 whitespace-nowrap">
              Войти
            </button>

            <Cart />
          </div>
        </div>

        {/* Поиск на телефоне */}
        <div className="md:hidden mt-3">
          <Search />
        </div>
      </nav>
    </header>
  );
}

export { Header };
