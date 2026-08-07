import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { ShopContext } from "@/context";
import { useContext } from "react";
import { formatPrice } from "@/utils/formatters";
import { QuantityControl } from "@/components/buttons/QuantityControl";

export function BasketCard({ item }) {
  const { delItem, incrementItem, decrementItem } = useContext(ShopContext);
  return (
    <li
      key={item.id}
      className="group rounded-2xl card-border border-neutral-200/80 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
    >
      <div className="flex gap-4 sm:gap-5">
        <Link to={`/product/${item.id}`}>
          <img
            src={item.image}
            alt={item.title}
            className="h-24 w-24 shrink-0 rounded-2xl bg-neutral-100 object-cover sm:h-28 sm:w-28"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <Link to={`/product/${item.id}`}>
              <h2 className="w-56 shrink-0 truncate text-base font-semibold text-neutral-900 sm:text-lg">
                {item.title}
              </h2>
            </Link>

            <button
              type="button"
              onClick={() => delItem(item.id)}
              aria-label={`Удалить ${item.title}`}
              className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-1 text-sm text-neutral-500">
            {formatPrice(item.price)}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <QuantityControl
              variant={"itemPage"}
              id={item.id}
              quantity={item.quantity}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
            />

            <span className="text-lg font-bold text-neutral-900 sm:text-xl">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
