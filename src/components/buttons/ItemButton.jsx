import { ShopContext } from "@/context";
import { useContext } from "react";

const styles = {
  card: {
    wrapper: "w-32 sm:w-[100px] h-10 sm:h-8",

    controls: "h-full",

    minus: "h-full min-h-0 px-0 text-base",

    plus: "h-full min-h-0 px-0 text-base ",

    quantity: "h-full min-h-0 px-0 font-medium",

    buy: "h-full min-h-0",
  },

  itemPage: {
    wrapper: "mt-6 sm:mt-8 w-full md:w-72",

    controls: "h-12",

    minus: "h-12 min-h-12 text-xl",

    plus: "h-12 min-h-12  text-xl",

    quantity: "h-12 min-h-12 text-xl",

    buy: "h-12 min-h-12  text-base",
  },
};

export function ItemButton({ id, title, price, image, variant = "card" }) {
  const { addItem, incrementItem, decrementItem, openBasket, order } =
    useContext(ShopContext);

  const cls = styles[variant];

  const item = order.find((product) => product.id === id);
  const haveItem = !!item;

  const handleAdd = () => {
    addItem({ id, title, price, image });
    openBasket();
  };

  const handleIncrement = () => {
    incrementItem(id);
    openBasket();
  };

  const handleDecrement = () => {
    decrementItem(id);
    openBasket();
  };

  return (
    <div className={cls.wrapper}>
      {haveItem ? (
        <div className={`join w-full  ${cls.controls}`}>
          <button
            onClick={handleDecrement}
            className={`btn btn-accent join-item flex-1 rounded-l  border-0 shadow-none ${cls.minus}`}
          >
            −
          </button>

          <span
            className={`btn btn-accent join-item pointer-events-none flex-1 rounded-none border-0 shadow-none ${cls.quantity}`}
          >
            {item.quantity}
          </span>

          <button
            onClick={handleIncrement}
            className={`btn btn-accent join-item flex-1 rounded-r border-0 shadow-none ${cls.plus}`}
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className={`btn btn-accent  w-full ${cls.buy}`}
        >
          Купить
        </button>
      )}
    </div>
  );
}
