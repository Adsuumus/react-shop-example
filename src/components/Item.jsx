import { useContext } from "react";
import { ShopContext } from "../context";

import { Link } from "react-router-dom";

function Item({
  mainId: id,
  displayName: title,
  displayDescription: description,
  price: { regularPrice: price },
  displayAssets: [{ full_background: img }],
}) {
  const { addItem, delItem, incrementItem, decrimentItem, order } =
    useContext(ShopContext);

  const item = order.find((product) => product.id === id);
  const haveItem = !!item;

  return (
    <div className="flex flex-col h-full relative">
      <div className="bg-gray-800 hover:ring-2 hover:ring-blue-500 transition rounded-lg overflow-hidden relative flex-1">
        <Link to={`/product/${id}`}>
          <img
            src={`${import.meta.env.BASE_URL}${img}`}
            alt={title}
            className="w-full h-55 object-cover object-top"
          />

          <div className="p-5 pb-12">
            <h2 className="text-lg text-white font-semibold mb-1">{title}</h2>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{description}</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="absolute -bottom-5 -translate-x-1/2 left-1/2 flex flex-col items-center gap-1 px-4 py-2">
        <span className="uppercase text-xs px-3 py-1 bg-gray-700 rounded text-white">
          {price}&nbsp;₽
        </span>

        {haveItem ? (
          <div className="flex items-center gap-2 bg-gray-700 rounded">
            <button
              onClick={() => decrimentItem(id)}
              className="cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-gray-600 rounded-l transition-colors text-white font-bold"
            >
              −
            </button>
            <span className="text-white font-medium w-6 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => incrementItem(id)}
              className="cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-gray-600 rounded-r transition-colors text-white font-bold"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addItem({ id, title, price })}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-1.5 rounded text-sm transition-colors font-medium"
          >
            Купить
          </button>
        )}
      </div>
    </div>
  );
}

export { Item };
