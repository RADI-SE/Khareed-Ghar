import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../../services/authService";

export const useResetPassword = () => {
  const { resetPassword } = useAuthService();

  return useMutation({
    mutationFn: (email) => resetPassword(email),
  
  });
};
