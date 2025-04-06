import { useMutation } from "@tanstack/react-query";
import { useSellerService } from "../../services/seller/sellerServices";

export const useCreateProduct = (token) => {
  const { addProduct } = useSellerService();

  return useMutation({
    mutationFn: ({
      name,
      description,
      specifications,
      price,
      category,
      subcategory,
      seller,
      images,
      isAuction
    }) => {
       return addProduct(
        token,
        name,
        description,
        specifications,
        price,
        category,
        subcategory,
        seller,
        images,
        isAuction
      );
    },
  });
};
