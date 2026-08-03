import { useContext } from "react";
import { ShopContext } from "../context";

function Basket() {
  const { delItem, incrementItem, decrementItem, order } =
    useContext(ShopContext);

  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quantity;
  }, 0);

  if (!order.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Корзина пуста</h1>

          <p className="text-gray-500 mt-2">
            Добавьте товары, чтобы оформить заказ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Товары */}
        <div className="md:col-span-2 space-y-4">
          {order.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border rounded-xl p-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h2 className="font-medium">{item.title}</h2>

                <p className="text-gray-500">{item.price} ₽</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => decrementItem(item.id)}
                    className="border rounded px-3 py-1"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => incrementItem(item.id)}
                    className="border rounded px-3 py-1"
                  >
                    +
                  </button>
                </div>
              </div>

              <button onClick={() => delItem(item.id)} className="text-red-500">
                Удалить
              </button>
            </div>
          ))}
        </div>

        {/* Итог */}
        <div className="border rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Итого</h2>

          <div className="flex justify-between mb-6">
            <span>Сумма:</span> <span>{totalPrice}</span>
          </div>

          <button
            className="
              w-full
              bg-black
              text-white
              rounded-xl
              py-3
              hover:opacity-90
            "
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}

export { Basket };
