import { useContext, useEffect, useRef } from "react";
import { ShopContext } from "@/context";
import { PopupBasketCard } from "@/components/cards/PopupBasketCard";
import { NavLink } from "react-router-dom";
import { formatPrice } from "@/utils/formatters";

function Basket() {
  const { order, showBasket, closeBasket } = useContext(ShopContext);

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
        closeBasket();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBasket, closeBasket]);

  useEffect(() => {
    if (order.length < 1) closeBasket();
  }, [order]);

  return (
    <div
      ref={basketRef}
      className={`
    absolute top-14 right-5 z-50 w-[420px]
    transition-all duration-200 ease-out
    hidden md:block
    ${
      showBasket
        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
        : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
    }
  `}
    >
      <div className="bg-base-100 rounded-box shadow-xl overflow-hidden">
        <ul className="list max-h-80 overflow-y-auto">
          {order.length
            ? order.map((item) => <PopupBasketCard key={item.id} {...item} />)
            : null}
        </ul>

        <div className="relative flex items-center justify-between px-4 py-6 bg-white">
          <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-white pointer-events-none" />
          {order.length ? (
            <>
              <span className="font-semibold text-base-content">
                Итог: {formatPrice(totalPrice)}
              </span>

              <NavLink to="/basket" onClick={closeBasket} className="btn">
                В корзину
              </NavLink>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export { Basket };
