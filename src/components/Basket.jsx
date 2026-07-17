import { BasketItem } from "./BasketItem";

import { useContext } from "react";

import { ShopContext } from "../context";

function Basket() {
  const { order, toggleBasket } = useContext(ShopContext);

  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quantity;
  }, 0);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[600px]">
      <ul className="max-w-md mx-auto border border-gray-200 rounded-lg overflow-hidden bg-white min-w-[300px]">
        <li className="px-4 py-3 bg-indigo-50 border-gray-100 flex justify-between items-center">
          <span>Корзина</span>
          <button
            onClick={() => toggleBasket()}
            className="text-gray-500 cursor-pointer  hover:text-gray-700 hover:bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </li>
        {order.length ? (
          order.map((item) => {
            return <BasketItem key={item.id} {...item} />;
          })
        ) : (
          <BasketItem title={"Корзина пуста"} />
        )}

        <li className="px-4 py-3 bg-indigo-50">
          Общая стоимость: {totalPrice}
        </li>
      </ul>
    </div>
  );
}

export { Basket };
