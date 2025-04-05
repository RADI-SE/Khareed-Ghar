import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../../services/authService";

export const useResendVerificationCode = () => {
  const { resendVerificationCode } = useAuthService();

  return useMutation({
    mutationFn: (email) => resendVerificationCode(email),
 
  });
};
