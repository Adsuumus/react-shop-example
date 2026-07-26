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
              {item.displayName}
            </h1>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>Цена: {item.price.regularPrice} ₽</p>
              <p>{item.displayDescription}</p>
              <img
                src={`${import.meta.env.BASE_URL}${item.displayAssets[0].full_background}`}
                alt={item.displayName}
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
