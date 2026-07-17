import { Item } from "./Item";

function Shop({ goods = [], addToBasket = () => {} }) {
  return (
    <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {goods.map((item) => {
          return <Item key={item.mainId} {...item} addToBasket={addToBasket} />;
        })}
      </div>
    </main>
  );
}

export { Shop };
