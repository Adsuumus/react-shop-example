import { useParams } from "react-router-dom";
import { useItem } from "@/hooks/useItems";
import { Preloader } from "@/components";
import { formatPrice } from "@/utils/formatters";
import { ItemButton } from "@/components/buttons/ItemButton";

function ItemPage() {
  const { id } = useParams();
  const { item } = useItem(id);

  return (
    <>
      {!item ? (
        <Preloader />
      ) : (
        <section className="py-8 md:py-16 dark:bg-gray-900 antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <img src={item.image} alt={item.title} className="w-full" />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {item.title}
                </h1>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <ItemButton
                  variant={"itemPage"}
                  id={id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export { ItemPage };
