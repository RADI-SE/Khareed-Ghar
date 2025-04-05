import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export const useRPassword = () => {
  const { rPassword } = useAuthService();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({token, password, confirmPassword}) =>
      rPassword(token, password, confirmPassword),
    onSuccess: () => {
       navigate("/auth/signin");
    },
   
  });
};
