import { useContext, useLayoutEffect, useState } from "react";
import { ShopContext } from "@/context";
import { formatPrice } from "@/utils/formatters";
import { Link } from "react-router-dom";
import { ItemButton } from "@/components/buttons/ItemButton";

function ShopItem({
  id,
  title,
  description,
  price,
  image,
  textBackgroundColor,
}) {
  const { addItem, incrementItem, decrementItem, order, openBasket } =
    useContext(ShopContext);

  const [isInitialBlock, setIsInitialBlock] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const item = order.find((product) => product.id === id);
  const haveItem = !!item;

  useLayoutEffect(() => {
    if (haveItem) {
      setIsInitialBlock(true);
      const timer = setTimeout(() => setIsInitialBlock(false), 200);
      return () => clearTimeout(timer);
    }
  }, [haveItem]);

  return (
    <div className="flex flex-col h-[390px] relative">
      <div
        style={{
          backgroundColor: `color-mix(in srgb, #${textBackgroundColor.substring(0, 6)} 20%, #1f2937 60%)`,
        }}
        className="hover:ring-2 hover:ring-blue-500 transition rounded-lg overflow-hidden relative h-full"
      >
        <Link to={`/product/${id}`}>
          <div className="h-[250px] w-full overflow-hidden">
            <img
              onLoad={() => setImageLoaded(true)}
              src={image}
              alt={title}
              className={`
                w-full h-full object-contain transition-opacity duration-300
                ${imageLoaded ? "opacity-100" : "opacity-0"}
              `}
            />
          </div>
        </Link>

        <div className="p-5 pt-0 pb-12">
          <Link to={`/product/${id}`}>
            <h2 className="text-lg text-white font-semibold mb-1 line-clamp-2">
              {title}
            </h2>
          </Link>

          <Link to={`/product/${id}`}>
            <div className="flex items-center gap-2 text-sm text-gray-400 line-clamp-2">
              <span>{description}</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 px-4 py-2">
        <span className="uppercase text-xs px-3 py-1 badge badge-warning">
          {formatPrice(price)}
        </span>

        <ItemButton id={id} title={title} price={price} image={image} />
      </div>
    </div>
  );
}

export { ShopItem };
