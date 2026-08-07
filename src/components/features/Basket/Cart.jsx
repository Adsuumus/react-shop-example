import { useContext } from "react";
import { ShopContext } from "@/context";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Cart() {
  const { order } = useContext(ShopContext);

  const quantity = order?.reduce((el, item) => el + item.quantity, 0) ?? 0;

  return (
    <NavLink to="/basket" className="group">
      <div className="flex-none">
        <div
          tabIndex={0}
          role="button"
          className="
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        bg-white/7
        text-white
        transition
        hover:bg-white/15
        active:scale-95
      "
        >
          <div className="indicator">
            <ShoppingCart size={24} />

            <span
              className="
            badge
            badge-sm
            bg-blue-500
            text-white
            border-none
            indicator-item
          "
            >
              {quantity}
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export { Cart };
