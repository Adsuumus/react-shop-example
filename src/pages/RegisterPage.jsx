import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(
      { username, password },
      {
        onSuccess: (data) => {
          if (data.ok) {
            navigate("/");
          }
        },
      },
    );
  };

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Регистрация
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            placeholder="Логин"
            value={username}
            type="text"
            className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="cursor-pointer w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition"
          >
            Зарегестрироваться
          </button>

          <p className="text-center text-gray-400 text-sm">
            <NavLink to="/login" className="text-blue-400">
              Вход
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export { RegisterPage };
