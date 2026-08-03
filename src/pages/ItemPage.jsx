import { useParams } from "react-router-dom";
import { useItem } from "../hooks/useItems";
import { Preloader } from "../components";
import { useContext } from "react";
import { ShopContext } from "../context";

function ItemPage() {
  const { id } = useParams();
  const { item } = useItem(id);

  const { addItem, incrementItem, decrementItem, order, openBasket } =
    useContext(ShopContext);

  const cartItem = order.find((product) => product.id === id);
  const haveItem = !!cartItem;

  return (
    <div className="min-h-screen text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {!item ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <Preloader />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Левая часть - картинка */}
            <div className="flex justify-center">
              <div className="w-full max-w-[500px] h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-[450px] max-w-[450px] object-contain"
                />
              </div>
            </div>

            {/* Правая часть - информация */}
            <div className="flex flex-col pt-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-400">
                {item.title}
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {item.description}
              </p>

              <div className="text-4xl font-bold text-blue-400 mb-8">
                {item.price} ₽
              </div>

              <div className="w-full max-w-md h-12">
                {haveItem ? (
                  <div className="flex bg-gray-700 rounded-xl h-full overflow-hidden">
                    <button
                      onClick={() => {
                        decrementItem(cartItem.id);
                        openBasket();
                      }}
                      className="
                        flex-1
                        cursor-pointer
                        hover:bg-gray-600
                        transition-colors
                        text-white
                        font-bold
                        text-xl
                      "
                    >
                      −
                    </button>

                    <span
                      className="
                        w-14
                        flex-shrink-0
                        flex
                        items-center
                        justify-center
                        text-white
                        font-semibold
                        text-lg
                      "
                    >
                      {cartItem.quantity}
                    </span>

                    <button
                      onClick={() => {
                        incrementItem(cartItem.id);
                        openBasket();
                      }}
                      className="
                        flex-1
                        cursor-pointer
                        hover:bg-gray-600
                        transition-colors
                        text-white
                        font-bold
                        text-xl
                      "
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      addItem({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        image: item.image,
                      });
                      openBasket();
                    }}
                    className="
                      cursor-pointer
                      w-full
                      h-full
                      bg-blue-600
                      hover:bg-blue-700
                      transition-colors
                      rounded-xl
                      text-white
                      text-lg
                      font-semibold
                    "
                  >
                    Добавить в корзину
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { ItemPage };
