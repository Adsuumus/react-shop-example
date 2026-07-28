function LoginPage() {
  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Вход</h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Пароль"
            className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition">
            Войти
          </button>

          <p className="text-center text-gray-400 text-sm">
            Нет аккаунта?{" "}
            <a href="#" className="text-blue-400">
              Регистрация
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export { LoginPage };
