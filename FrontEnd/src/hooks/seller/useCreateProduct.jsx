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
    }) => {
      console.log("Received specifications payload: ", specifications); // Log the images payload dynamically
      return addProduct(
        token,
        name,
        description,
        specifications,
        price,
        category,
        subcategory,
        seller,
        images
      );
    },
    onSuccess: (data) => {
      console.log("Product created successfully.", data);
      return data;
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });
};
