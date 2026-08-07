import { useContext } from "react";
import { ShopContext } from "@/context";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { formatPrice } from "@/utils/formatters";
import { QuantityControl } from "@/components/buttons/QuantityControl";

function PopupBasketCard({
  id = 0,
  title = "",
  price = 0,
  quantity = 0,
  image,
}) {
  const { delItem, incrementItem, decrementItem } = useContext(ShopContext);

  return (
    <li className="list-row">
      <Link to={`/product/${id}`}>
        <div className="size-10 rounded-box bg-base-200 flex items-center justify-center text-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-box"
          />
        </div>
      </Link>

      <div className="min-w-0">
        <Link to={`/product/${id}`}>
          <div className="font-medium truncate text-gray-600">{title}</div>
        </Link>

        {quantity ? (
          <div className="text-xs text-gray-500">
            {formatPrice(price)} × {quantity} = {formatPrice(price * quantity)}
          </div>
        ) : (
          <div className="text-xs">Корзина пуста</div>
        )}
      </div>

      {quantity ? (
        <>
          <QuantityControl
            id={id}
            quantity={quantity}
            incrementItem={incrementItem}
            decrementItem={decrementItem}
          />

          <button
            onClick={() => delItem(id)}
            className="text-gray-400 hover:text-red-500 cursor-pointer w-7 h-7 flex items-center justify-center text-lg transition-colors rounded-full text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </>
      ) : null}
    </li>
  );
}

export { PopupBasketCard };
