function ItemSkeleton() {
  return (
    <div className="flex flex-col h-full relative animate-pulse">
      <div className="rounded-lg overflow-hidden bg-gray-800">
        <div className="aspect-square bg-gray-700" />

        <div className="p-5 pb-12 min-h-[120px]">
          <div className="h-6 w-3/4 bg-gray-700 rounded mb-3" />
          <div className="h-4 w-full bg-gray-700 rounded" />
          <div className="h-4 w-2/3 bg-gray-700 rounded mt-2" />
        </div>
      </div>

      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
        <div className="h-8 w-[100px] bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export { ItemSkeleton };
