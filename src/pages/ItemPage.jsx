import { useParams } from "react-router-dom";
import { useItem } from "../hooks/useItems";
import { Preloader } from "../components/Preloader";

function ItemPage() {
  const { id } = useParams();
  const { item } = useItem(id);

  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-3xl mx-auto">
        {!item ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <Preloader />
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-6 text-blue-400">
              {item.title}
            </h1>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>Цена: {item.price} ₽</p>
              <p>{item.description}</p>
              <img
                src={item.image}
                alt={item.title}
                className="max-w-full h-auto"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { ItemPage };
