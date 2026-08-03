import { useContext, useEffect, useRef } from "react";
import { ShopContext } from "../../../context";
import { BasketItem } from "./BasketItem";
import { NavLink } from "react-router-dom";

function Basket() {
  const { order, showBasket, clouseBasket } = useContext(ShopContext);

  const basketRef = useRef(null);

  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quantity;
  }, 0);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showBasket &&
        basketRef.current &&
        !basketRef.current.contains(event.target)
      ) {
        clouseBasket();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBasket, clouseBasket]);

  return (
    <div
      ref={basketRef}
      className={`
        absolute top-14 right-0 z-50 w-[420px]
        transition-all duration-200 ease-out
        hidden md:block
        ${
          showBasket
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }
      `}
    >
      <ul className="border border-gray-200 rounded-t-lg overflow-y-auto bg-white shadow-xl max-h-80">
        {order.length ? (
          order.map((item) => <BasketItem key={item.id} {...item} />)
        ) : (
          <BasketItem title="Корзина пуста" />
        )}
      </ul>

      <div className="flex items-center justify-between px-4 py-3 bg-indigo-50 border border-t-0 border-gray-200 rounded-b-lg">
        <span className="font-semibold">Итог: {totalPrice} ₽</span>

        <NavLink
          to="/basket"
          onClick={clouseBasket}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
        >
          Перейти в корзину
        </NavLink>
      </div>
    </div>
  );
}

export { Basket };
