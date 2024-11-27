import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../../services/authService";

export const useSignInUser = () => {
  const { signin } = useAuthService();

  return useMutation({
    mutationFn: ({ email, password }) => signin(email, password),
    onSuccess: (data) => {
      console.log("User logged in successfully.", data);
    },
    onError: (error) => {
      console.error("Error logging in user:", error);
    },
  });
};
