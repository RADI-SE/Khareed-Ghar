import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../services/admin/manageUsers";

export const useProfileData = (token) => {
  const { displayUserProfile } = useAdminService();
  const mutation = useMutation({
    mutationFn: (id) => displayUserProfile(token, id),
  });
  return mutation;
}; 