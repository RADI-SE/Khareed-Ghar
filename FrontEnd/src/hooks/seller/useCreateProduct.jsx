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

    }) =>
      addProduct(
        token,
        name,
        description,
        specifications,
        price,
        category,
        subcategory,
        seller,
    
      ),
    onSuccess: () => {
      console.log("Product created successfully.");
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });
};
