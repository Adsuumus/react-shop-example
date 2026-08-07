import { useLogout } from "../hooks/useAuthMutations";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "@/context";
import { useAuth } from "../context/authContext";
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import { z } from "zod";
import { getUserProfile } from "../api/userAPI";
import { Clock, Calendar, ShoppingCart, ArrowRight, Lock } from "lucide-react";
import { StatCard } from "@/components/cards/StatCard";
import { formatDate } from "@/utils/formatters";

const passwordSchema = z
  .object({
    password: z.string().min(1, "Введите пароль"),
    passwordRepeat: z.string().min(1, "Повторите пароль"),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Пароли не совпадают",
    path: ["passwordRepeat"],
  });

function UserPage() {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [alertPassword, setAlertPassword] = useState(null);
  const logoutMutation = useLogout();
  const navigate = useNavigate();
  const { setUserId, order } = useContext(ShopContext);
  const { username } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await getUserProfile();
        setUserData(response.data);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

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

    const result = passwordSchema.safeParse({
      password,
      passwordRepeat,
    });

    if (!result.success) {
      const issue = result.error.issues[0];

      setAlertPassword({ field: issue.path[0], message: issue.message });
      return;
    }

    updatePasswordMutation.mutate(password, {
      onSuccess: () => {
        setPassword("");
        setPasswordRepeat("");

        setTimeout(() => {
          updatePasswordMutation.reset();
        }, 3000);
      },
    });
  };

  const clearPasswordMessages = () => {
    setAlertPassword(null);
    updatePasswordMutation.reset();
  };

  const displayName = username || userData?.email?.split("@")[0] || "Профиль";
  const avatarLetter = displayName.trim().charAt(0) || "?";
  const cartCount = order?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <div className="text-black">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:py-10">
        <section className="bg-white relative overflow-hidden card card-border bg-base shadow-sm p-6 sm:p-8">
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="text-white grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold uppercase shadow-lg shadow-blue-600/20">
                {avatarLetter}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                  Личный кабинет
                </p>

                <h1 className="mt-1 truncate text-2xl font-semibold sm:text-3xl text-black">
                  {displayName}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-gray-400">
                  {isLoading ? (
                    <Skeleton className="h-4 w-44" />
                  ) : (
                    <>
                      {userData?.email && (
                        <span className="truncate">{userData.email}</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="btn"
            >
              Выйти
            </button>
          </div>
        </section>

        <section className=" grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={<Clock size={20} />}
            label="Последний вход"
            value={formatDate(userData?.last_sign_in_at)}
            isLoading={isLoading}
          />

          <StatCard
            icon={<Calendar size={20} />}
            label="Дата регистрации"
            value={formatDate(userData?.created_at)}
            isLoading={isLoading}
          />

          <NavLink
            to="/basket"
            className="bg-white group rounded-2xl card-border bg-base shadow-sm p-5 transition  hover:bg-gray-100 "
          >
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                <ShoppingCart size={20} />
              </span>

              <div className="min-w-0">
                <p className="text-sm text-gray-400">В корзине</p>

                <p className="mt-1 font-medium text-black">
                  {cartCount} {pluralItems(cartCount)}
                </p>
              </div>

              <span className="ml-auto text-gray-600 transition group-hover:translate-x-0.5 group-hover:text-blue-400">
                <ArrowRight size={20} />
              </span>
            </div>
          </NavLink>
        </section>

        <div className="grid gap-6 lg:grid-cols-5">
          <section className=" bg-white rounded-2xl card-border shadow-sm p-6 sm:p-7 lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                <Lock size={20} />
              </span>

              <div>
                <h2 className="text-lg font-medium">Смена пароля</h2>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearPasswordMessages();
                }}
                onFocus={clearPasswordMessages}
                type="password"
                placeholder="Новый пароль"
                className="
  w-full md:w-80
     input
    "
              />

              <div>
                <input
                  type="password"
                  value={passwordRepeat}
                  onChange={(e) => {
                    setPasswordRepeat(e.target.value);
                    clearPasswordMessages();
                  }}
                  onFocus={clearPasswordMessages}
                  placeholder="Повторите пароль"
                  className="
w-full md:w-80
     input
    "
                />

                <div className="h-4 mt-1">
                  {alertPassword ? (
                    <p className="text-sm text-red-400">
                      {alertPassword.message}
                    </p>
                  ) : updatePasswordMutation.isError ? (
                    <p className="text-sm text-red-400">
                      {updatePasswordMutation.error.message}
                    </p>
                  ) : updatePasswordMutation.isSuccess ? (
                    <p className="text-sm text-green-400">Пароль изменен</p>
                  ) : null}
                </div>
              </div>

              <button
                disabled={updatePasswordMutation.isPending}
                className="btn btn-block md:w-auto md:min-w-44"
              >
                {updatePasswordMutation.isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Изменить пароль"
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

function Skeleton({ className = "" }) {
  return (
    <span
      className={`block animate-pulse rounded bg-gray-800 ${className}`}
      aria-hidden="true"
    />
  );
}

function pluralItems(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return "товар";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "товара";
  return "товаров";
}

export { UserPage };
