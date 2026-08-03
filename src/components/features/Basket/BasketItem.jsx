import { useContext } from "react";
import { ShopContext } from "../../../context";

function BasketItem({ id = 0, title = "", price = 0, quantity = 0 }) {
  const { delItem, incrementItem, decrementItem } = useContext(ShopContext);

  return (
    <li className="px-4 py-3 bg-white border-b border-gray-100">
      {/* Название товара */}
      <div className="text-sm font-medium text-gray-800 mb-2 break-words">
        {title}
      </div>

      {quantity ? (
        <div className="flex items-center justify-between">
          {/* Количество */}
          <div className="flex items-center gap-1 bg-gray-200 rounded text-black text-sm font-medium">
            <button
              onClick={() => decrementItem(id)}
              className="cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-gray-400 rounded-l transition-colors"
            >
              −
            </button>

            <span className="w-7 text-center select-none">{quantity}</span>

            <button
              onClick={() => incrementItem(id)}
              className="cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-gray-400 rounded-r transition-colors"
            >
              +
            </button>
          </div>

          {/* Цена */}
          <span className="text-sm font-medium">{price * quantity} руб.</span>

          {/* Удаление */}
          <button
            onClick={() => delItem(id)}
            className="text-gray-400 hover:text-red-500 cursor-pointer w-7 h-7 flex items-center justify-center text-lg transition-colors"
          >
            ✕
          </button>
        </div>
      ) : null}
    </li>
  );
}

export { BasketItem };
