import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../../services/authService";

export const useResetPassword = () => {
  const { resetPassword } = useAuthService();

  return useMutation({
    mutationFn: (email) => resetPassword(email),
    onSuccess: (data) => {
      console.log("Reset Password code sent successfully.", data);
    },
    onError: (error) => {
      console.error("Error sending Reset Password code:", error);
    },
  });
};
