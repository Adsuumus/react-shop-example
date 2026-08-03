import { useLogout } from "../hooks/useAuthMutations";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context";
import { useUpdatePassword } from "../hooks/useUpdatePassword";

function UserPage() {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const logoutMutation = useLogout();
  const navigate = useNavigate();
  const { setUserId } = useContext(ShopContext);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setUserId(null);
        navigate("/");
      },
    });
  };

  const updatePasswordMutation = useUpdatePassword();
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      alert("Пароли не совпадают");
      return;
    }

    updatePasswordMutation.mutate(password);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Верхняя карточка */}
        <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-8 shadow-xl">
          <button
            onClick={handleLogout}
            className="
              absolute right-6 top-6
              px-5 py-2
              rounded-xl
              bg-red-500/90
              hover:bg-red-500
              text-white
              font-medium
              transition
              cursor-pointer
            "
          >
            Выйти
          </button>

          <div>
            <h1 className="text-3xl font-semibold">Личный кабинет</h1>

            <p className="mt-2 text-zinc-400">
              Управление профилем и настройками аккаунта
            </p>
          </div>
        </div>

        {/* Настройки */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Смена пароля */}
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
            <h2 className="text-xl font-medium mb-4">Смена пароля</h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Новый пароль"
                className="
                  w-full
                  rounded-xl
                  bg-zinc-800
                  border border-zinc-700
                  px-4 py-3
                  outline-none
                  focus:border-blue-500
                "
              />

              <input
                type="password"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
                placeholder="Повторите пароль"
                className="
                  w-full
                  rounded-xl
                  bg-zinc-800
                  border border-zinc-700
                  px-4 py-3
                  outline-none
                  focus:border-blue-500
                "
              />

              <button
                className="
                  w-full
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  py-3
                  font-medium
                  transition
                "
              >
                Изменить пароль
              </button>
            </form>
          </div>
        </div>

        {/* История действий */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-xl font-medium mb-5">История</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="py-3">Дата</th>
                  <th className="py-3">Действие</th>
                  <th className="py-3">Описание</th>
                </tr>
              </thead>

              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-800">
                  <td className="py-3">03.08.2026</td>
                  <td>Регистрация</td>
                  <td>Создан новый аккаунт</td>
                </tr>

                <tr className="border-b border-zinc-800">
                  <td className="py-3">03.08.2026</td>
                  <td>Вход</td>
                  <td>Авторизация выполнена успешно</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export { UserPage };
