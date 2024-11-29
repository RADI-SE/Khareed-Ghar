import { useMutation } from "@tanstack/react-query";
import { useSellerService } from "../../services/seller/sellerServices";

export const useCreateProduct = (token) => {
  const { addProduct } = useSellerService();
  const images = "https://example.com/images/smartphone-x1-front.jpg"
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
        images
      ),
    onSuccess: () => {
      console.log("Product created successfully.");
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });
};
