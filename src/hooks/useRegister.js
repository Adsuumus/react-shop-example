import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/authContext";
import { signUp } from "../features/auth/authService";

export function useRegister() {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }) => signUp(username, password),

    onSuccess: (data) => {
      if (!data.ok) return;
      if (data.token) {
        login(data.token, data.username);
        queryClient.invalidateQueries();
      }
    },
  });
}
