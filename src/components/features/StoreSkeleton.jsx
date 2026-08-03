function StoreSkeleton() {
  return (
    <div className="flex flex-col h-[390px] relative animate-pulse">
      <div className="rounded-lg overflow-hidden bg-gray-800 h-full relative">
        <div className="h-[250px] w-full bg-gray-700" />

        <div className="p-5 pt-2 pb-12">
          <div className="h-[28px] w-3/4 bg-gray-700 rounded mb-2" />
        </div>
      </div>

      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 px-4 py-2">
        <div className="h-[26px] w-16 bg-gray-700 rounded" />
        <div className="h-8 w-[100px] bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export { StoreSkeleton };
