import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../../services/admin/useRegionServices/useRegionServices";

export const useCreateRegion = () => {
  const { addRegion } = useAdminService();

  return useMutation({
    mutationFn: ({  id, state, city }) => {
      console.log("Received payload: from react query : ",  id, state, city); // Log the images payload dynamically
      return addRegion( id, state, city);
    },
    onSuccess: () => {
      console.log("Region created successfully.");
    },
    onError: (error) => {
      console.error("Error creating zoon:", error);
    },
  });
};
