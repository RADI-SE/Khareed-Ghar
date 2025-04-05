import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../../services/authService";

export const useCreateUser= () => {
  const { signup } = useAuthService();

  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
      confirmPassword,
      role,
      isAgreeToTerms,
    }) =>
        signup(
        name,
        email,
        password,
        confirmPassword,
        role,
        isAgreeToTerms
      ),
 
  });
};
