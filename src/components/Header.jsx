function Header() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white ">
      <div className="flex items-center gap-8">
        <a className="text-xl font-bold tracking-tight hover:text-blue-400 transition cursor-pointer">
          Магазин вещей
        </a>
      </div>
    </nav>
  );
}

export { Header };
