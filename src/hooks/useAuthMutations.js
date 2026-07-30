import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/authContext";
import { signIn, signOut } from "../features/auth/authService";

export function useLogin() {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }) => signIn(username, password),
    onSuccess: (data) => {
      if (data.ok) {
        login(data.token, data.username);
        queryClient.invalidateQueries();
      }
    },
  });
}

export function useLogout() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      signOut();
      return Promise.resolve();
    },
    onSettled: () => {
      logout();
      queryClient.clear();
    },
  });
}
