import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSellerService } from "../../services/seller/sellerServices";

export const useEditProduct = (token) => {
  const { editProduct } = useSellerService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name, description, specifications, price, category, seller, images }) =>
      editProduct(
        token,
        id,
        name,
        description,
        specifications,
        price,
        category,
        seller,
        images
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
