import { useState, useContext } from "react";
import { useLogin } from "@/hooks/useAuthMutations";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ShopContext } from "@/context";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const { setUserId } = useContext(ShopContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: (data) => {
          setUserId(data.user.id);
          navigate("/");
        },
      },
    );
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg border border-gray-200">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Вход
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
              {loginMutation.isError && (
                <p className="text-sm text-red-500">
                  {loginMutation.error.message}
                </p>
              )}
            </div>
          </div>

          <button
            disabled={loginMutation.isPending}
            type="submit"
            className="
          w-full
         btn
        "
          >
            {loginMutation.isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Вход"
            )}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            <NavLink
              to="/registration"
              className="text-blue-600 hover:underline"
            >
              Зарегистрироваться
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export { LoginPage };
