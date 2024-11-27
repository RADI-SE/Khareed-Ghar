import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../../services/authService";

export const useResendVerificationCode = () => {
  const { resendVerificationCode } = useAuthService();

  return useMutation({
    mutationFn: (email) => resendVerificationCode(email),
    onSuccess: (data) => {
      console.log("verification Token resent successfully.", data);
    },
    onError: (error) => {
      console.error("Error resending verification Token:", error);
    },
  });
};
