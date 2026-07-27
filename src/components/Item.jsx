import { useContext, useLayoutEffect, useState } from "react";
import { ShopContext } from "../context";

import { Link } from "react-router-dom";

function Item({ id, title, description, price, image, colors }) {
  const { addItem, incrementItem, decrimentItem, order } =
    useContext(ShopContext);
  const [isInitialBlock, setIsInitialBlock] = useState(false);

  const item = order.find((product) => product.id === id);
  const haveItem = !!item;

  useLayoutEffect(() => {
    if (haveItem) {
      setIsInitialBlock(true);
      const timer = setTimeout(() => setIsInitialBlock(false), 200);
      return () => clearTimeout(timer);
    }
  }, [haveItem]);

  return (
    <div className="flex flex-col h-full relative">
      <div
        style={{
          backgroundColor: `color-mix(in srgb, #${colors.textBackgroundColor.substring(0, 6)} 20%, #1f2937 60%)`,
        }}
        className="hover:ring-2 hover:ring-blue-500 transition rounded-lg overflow-hidden relative flex-1"
      >
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-contain"
          />
        </Link>
        <div className="p-5 pb-12">
          <Link to={`/product/${id}`}>
            <h2 className="text-lg text-white font-semibold mb-1">{title}</h2>
          </Link>

          <Link to={`/product/${id}`}>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{description}</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 px-4 py-2">
        <span className="uppercase text-xs px-3 py-1 bg-gray-700 rounded text-white whitespace-nowrap">
          {price}&nbsp;₽
        </span>
        <div className="w-[100px] h-8">
          {haveItem ? (
            <div className="flex bg-gray-700 rounded h-full">
              <button
                disabled={isInitialBlock}
                onClick={() => decrimentItem(id)}
                className="cursor-pointer flex-1 hover:bg-gray-600 rounded-l transition-colors text-white font-bold text-lg hover:scale-105"
              >
                −
              </button>
              <span className="w-8 flex-shrink-0 text-white font-medium text-center self-center">
                {item.quantity || 1}
              </span>
              <button
                onClick={() => incrementItem(id)}
                className="cursor-pointer flex-1 hover:bg-gray-600 rounded-r transition-colors text-white font-bold text-lg hover:scale-102"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem({ id, title, price })}
              className="cursor-pointer w-full h-full bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors font-medium"
            >
              Купить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { Item };
