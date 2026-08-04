import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/userAPI";
import { apiError } from "../api/apiError";

function useUpdatePassword() {
  return useMutation({
    mutationFn: async (password) => {
      try {
        return await changePassword(password);
      } catch (error) {
        throw apiError(error);
      }
    },
  });
}

export { useUpdatePassword };
