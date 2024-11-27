import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../../services/authService";

export const useVerifyEmail = () => {
  const { verifyEmail } = useAuthService();

  return useMutation({
    mutationFn: (verificationToken) => verifyEmail(verificationToken),
    onSuccess: (data) => {
      console.log("verification Token sent successfully.", data);
    },
    onError: (error) => {
      console.error("Error sending verification Token:", error);
    },
  });
};
