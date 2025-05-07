import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSellerService } from "../../services/seller/sellerServices";

export const useEditProduct = (token) => {
  const { editProduct } = useSellerService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name, description, specifications, price, images }) =>
      editProduct(
        token,
        id,
        name,
        description,
        specifications,
        price,
        images
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
