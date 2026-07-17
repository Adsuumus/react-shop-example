function Item({
  mainId: id,
  displayName: title,
  displayDescription: description,
  price: { regularPrice: price },
  displayAssets: [{ full_background: img }],
  addToBasket = Function.prototype,
}) {
  return (
    <div className="bg-gray-800 hover:ring-2 hover:ring-blue-500 transition rounded-lg overflow-hidden relative">
      <img
        src={img}
        alt={title}
        className="w-full h-55 object-cover object-top"
      />
      <div className="p-5 pb-16">
        <h2 className="text-lg text-white font-semibold mb-1">{title}</h2>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{description}</span>
        </div>
      </div>
      <div className="absolute bottom-3 right-3 inline-flex items-center gap-3">
        <span className="uppercase text-xs px-2 py-0.5 bg-gray-700 rounded text-white">
          {price}&nbsp;₽
        </span>
        <button
          onClick={() => addToBasket({ id, title, price })}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm"
        >
          Купить
        </button>
      </div>
    </div>
  );
}

export { Item };
