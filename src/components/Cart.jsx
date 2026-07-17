import { useState } from "react";

function Cart(props) {
  const { order, setShow, state } = props;

  return (
    <div className="fixed top-20 right-12 z-40">
      <button
        onClick={() => setShow(!state)}
        className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>

        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {order}
        </span>
      </button>
    </div>
  );
}

export { Cart };
