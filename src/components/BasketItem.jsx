import { useContext } from "react";
import { ShopContext } from "../context";

function BasketItem({ id = 0, title = 0, price = 0, quantity = 0 }) {
  const { delItem, incrementItem, decrimentItem } = useContext(ShopContext);

  return (
    <li className="px-4 py-3 bg-white border-gray-100 flex justify-between items-center">
      <div className="flex items-center gap-3 min-w-0">
        <span className="truncate w-40 flex-shrink-0">{title}</span>
        {quantity ? (
          <div className="flex items-center bg-gray-100 rounded-lg flex-shrink-0">
            <button
              onClick={() => decrimentItem(id)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200 rounded-l-lg transition-colors cursor-pointer text-lg "
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-medium select-none">
              {quantity}
            </span>
            <button
              onClick={() => incrementItem(id)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200 rounded-r-lg transition-colors cursor-pointer text-lg leading-none select-none"
            >
              +
            </button>
          </div>
        ) : null}
        {quantity ? (
          <span className="text-sm font-medium flex-shrink-0">
            {price * quantity} руб.
          </span>
        ) : null}
      </div>
      {quantity ? (
        <button
          onClick={() => delItem(id)}
          className="text-gray-400 hover:text-red-500 cursor-pointer w-8 h-8 flex items-center justify-center transition-colors text-lg flex-shrink-0 ml-2"
        >
          ✕
        </button>
      ) : null}
    </li>
  );
}

export { BasketItem };
