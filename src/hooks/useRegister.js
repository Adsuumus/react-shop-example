import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../features/auth/authService";

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }) => signUp(username, password),

    onSuccess: (data) => {
      if (!data.ok) return;
      if (data.token) {
        queryClient.invalidateQueries();
      }
    },
  });
}
