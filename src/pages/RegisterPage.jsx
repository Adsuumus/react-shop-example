import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";
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
        onSuccess: () => {
          navigate("/login");
        },
      },
    );
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg border border-gray-200">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Регистрация
        </h1>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            placeholder="Логин"
            value={username}
            type="text"
            className="
          w-full
         input
        "
            onChange={(e) => setUsername(e.target.value)}
          />

          <div>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              className="
            w-full
            input
          "
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mt-1 h-4">
              {registerMutation.isError && (
                <p className="text-sm text-red-500">
                  {registerMutation.error.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="
         w-full
         btn
        "
          >
            Зарегистрироваться
          </button>

          <p className="text-center text-sm text-gray-500">
            <NavLink to="/login" className="text-blue-600 hover:underline">
              Вход
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export { RegisterPage };
