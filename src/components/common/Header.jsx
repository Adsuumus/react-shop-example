import { NavLink } from "react-router-dom";
import { Cart } from "../features/Basket/Cart";
import { Search } from "..";
import { useAuth } from "../../context/authContext";
import { Basket } from "../index";

const navClass = ({ isActive }) =>
  `whitespace-nowrap transition cursor-pointer ${
    isActive ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
  }`;

function Header() {
  const { isAuthenticated, username } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <nav className="px-4 md:px-12 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Левое меню */}
          <div className="basis-[350px] min-w-min justify-start flex items-center gap-4 md:gap-8 ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `whitespace-nowrap transition cursor-pointer text-lg md:text-xl font-bold tracking-tight ${
                  isActive
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-blue-400"
                }`
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
          <div className="hidden md:block flex-1 max-w-[700px] min-w-[300px]">
            <Search />
          </div>

          {/* Правая часть */}
          <div className="basis-[350px] min-w-min justify-end flex items-center gap-4 ">
            {!isAuthenticated ? (
              <NavLink
                to="/login"
                className="cursor-pointer px-4 py-2 text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition border border-gray-700 hover:border-gray-600 whitespace-nowrap"
              >
                Войти
              </NavLink>
            ) : (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `whitespace-nowrap transition cursor-pointer tracking-tight ${
                    isActive
                      ? "text-blue-300"
                      : "text-gray-300 hover:text-blue-400"
                  }`
                }
              >
                {username}
              </NavLink>
            )}

            <div className="relative">
              <Cart />
              <Basket />
            </div>
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
