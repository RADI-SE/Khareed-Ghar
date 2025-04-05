import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../../services/authService";

export const useVerifyEmail = () => {
  const { verifyEmail } = useAuthService();

  return useMutation({
    mutationFn: (verificationToken) => verifyEmail(verificationToken),
 
  });
};
