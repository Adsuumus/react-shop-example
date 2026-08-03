import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/userAPI";

export function useUpdatePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}
