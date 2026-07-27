import { useContext } from "react";
import { ShopContext } from "../../context";

function Cart() {
  const { toggleBasket, order } = useContext(ShopContext);

  const quantity = order?.reduce((el, item) => el + item.quantity, 0) ?? 0;

  return (
    <button
      onClick={toggleBasket}
      className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>

      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-900 font-bold ">
        {quantity}
      </span>
    </button>
  );
}

export { Cart };
