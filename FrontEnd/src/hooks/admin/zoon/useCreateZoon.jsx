import { useMutation } from "@tanstack/react-query";
import { useAdminService } from "../../../services/admin/useZoonServices/useZoonServices";

export const useCreateZoon = () => {
  const { addZoon } = useAdminService();

  return useMutation({
    mutationFn: ({  id, district, city }) => {
      console.log("Received payload: from react query : ",  id, district, city); // Log the images payload dynamically
      return addZoon( id, district, city);
    },
    onSuccess: () => {
      console.log("Zoon created successfully.");
    },
    onError: (error) => {
      console.error("Error creating zoon:", error);
    },
  });
};
