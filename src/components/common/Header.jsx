import { NavLink } from "react-router-dom";
import { Cart } from "../features/Basket/Cart";
import { useAuth } from "@/context/authContext";
import { Basket, Search } from "..";

function Header() {
  const { isAuthenticated, username } = useAuth();

  const navClass = ({ isActive }) =>
    `
    whitespace-nowrap
    transition
    text-md
    md:text-lg
    ${isActive ? "text-gray-100" : "text-gray-400 hover:text-gray-100"}
    `;

  return (
    <header className="sticky top-0 z-50 bg-gray-800 text-gray-400">
      <div className="navbar pl-5">
        <div className="navbar-start gap-2 lg:gap-6 pr-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `
              whitespace-nowrap
              text-lg
              md:text-xl
              font-bold
              tracking-tight
              transition
              ${
                isActive ? "text-gray-100" : "text-gray-400 hover:text-gray-100"
              }
              `
            }
          >
            Магазин вещей
          </NavLink>

          <NavLink
            to="/about"
            className={`${navClass({ isActive: false })} hidden lg:flex`}
          >
            О нас
          </NavLink>

          <NavLink
            to="/contact"
            className={`${navClass({ isActive: false })} hidden lg:flex`}
          >
            Связаться
          </NavLink>

          <div className="dropdown lg:hidden cursor-pointer">
            <div
              tabIndex={0}
              role="button"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                text-gray-400
                transition
                hover:bg-gray-700
                hover:text-gray-100
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex="-1"
              className="
                dropdown-content
                z-50
                mt-3
                w-48
                rounded-lg
                bg-gray-800
                p-2
                shadow-xl
              "
            >
              <li>
                <NavLink
                  to="/about"
                  className="
                    block
                    rounded-lg
                    px-3
                    py-2
                    transition
                    hover:bg-gray-700
                    hover:text-gray-100
                  "
                >
                  О нас
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className="
                    block
                    rounded-lg
                    px-3
                    py-2
                    transition
                    hover:bg-gray-700
                    hover:text-gray-100
                  "
                >
                  Связаться
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <Search className="hidden max-w-md md:flex" />

        <div className="navbar-end gap-4 pr-4">
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="
                text-gray-300
                transition
                hover:text-gray-100
              "
            >
              Войти
            </NavLink>
          ) : (
            <NavLink
              to="/profile"
              className="
                whitespace-nowrap
                text-gray-300
                transition
                hover:text-gray-100
              "
            >
              {username}
            </NavLink>
          )}

          <Cart />
          <Basket />
        </div>
      </div>

      <div className=" px-4 pb-3 pt-3 md:hidden">
        <Search />
      </div>
    </header>
  );
}

export { Header };
