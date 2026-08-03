function BasketSkeleton() {
  return (
    <div className="md:col-span-2 space-y-4">
      <div className="flex items-center gap-4 border rounded-xl p-4 animate-pulse">
        <div className="w-24 h-24 rounded-lg bg-gray-700 flex-shrink-0" />

        <div className="flex-1 space-y-2">
          <div className="h-6 w-3/4 bg-gray-700 rounded" />
          <div className="h-5 w-20 bg-gray-700 rounded" />

          <div className=" h-7 w-23 rounded bg-gray-700 "></div>
        </div>

        <div className="h-9 w-16 bg-gray-700 rounded flex-shrink-0" />
      </div>
    </div>
  );
}

export { BasketSkeleton };
