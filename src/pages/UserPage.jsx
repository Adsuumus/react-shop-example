import { useLogout } from "../hooks/useAuthMutations";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context";

function UserPage() {
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

  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
          <button
            onClick={handleLogout}
            className="cursor-pointer w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}

export { UserPage };
