import { useContext, useState, useEffect } from "react";

import { ShopContext } from "@/context";
import { NavLink } from "react-router-dom";
import { formatPrice } from "@/utils/formatters";
import { BasketCard } from "../components/cards/BasketCard";

function BasketPage() {
  const { order } = useContext(ShopContext);
  const [delay, setDelay] = useState(false);
  const [alertMoney, setAlertMoney] = useState(false);

  const totalPrice = order.reduce((sum, el) => sum + el.price * el.quantity, 0);
  const totalCount = order.reduce((sum, el) => sum + el.quantity, 0);

  function handleClick() {
    setDelay(true);

    setTimeout(() => {
      setDelay(false);
      setAlertMoney(true);
    }, 2000);
  }

  useEffect(() => {
    if (!alertMoney) return;

    const timer = setTimeout(() => {
      setAlertMoney(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [alertMoney]);

  if (!order.length) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="flex max-w-sm flex-col items-center text-center">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Корзина пуста
          </h1>

          <p className="mt-2 text-neutral-500">
            <NavLink to="/" className="link">
              Добавьте товары
            </NavLink>
            , чтобы оформить заказ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
          Корзина
        </h1>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-4">
          {order.map((item) => (
            <BasketCard key={item.id} item={item} />
          ))}
        </ul>

        <aside className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm lg:sticky lg:top-6 sm:p-8">
          <h2 className="text-xl font-bold text-neutral-900">Заказ</h2>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-neutral-500">Товары ({totalCount} шт.)</dt>
              <dd className="font-medium text-neutral-900">
                {formatPrice(totalPrice)}
              </dd>
            </div>
          </dl>

          <div className="my-6 border-t border-dashed border-neutral-200" />

          <div className="flex items-baseline justify-between">
            <span className="font-medium text-neutral-900">Итог</span>
            <span className="text-2xl font-bold text-neutral-900 sm:text-3xl">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <button
            onClick={handleClick}
            type="button"
            className="mt-6 btn btn-block"
            disabled={delay}
          >
            {delay ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Оформить заказ"
            )}
          </button>

          <p className="mt-4 text-center text-xs text-neutral-400">
            {alertMoney ? (
              <span className="text-red-500">Недостаточно средств</span>
            ) : (
              "Нажимая кнопку, вы соглашаетесь с условиями"
            )}
          </p>
        </aside>
      </div>
    </div>
  );
}

export { BasketPage };
