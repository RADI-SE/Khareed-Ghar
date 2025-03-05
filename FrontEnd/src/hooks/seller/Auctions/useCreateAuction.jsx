import { useMutation } from "@tanstack/react-query";
import { useSellerService } from "../../../services/seller/sellerServices";

export const useCreateAuction = (token) => {
  const { addAuction } = useSellerService();

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
      return addAuction(
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
    onSuccess: () => {
      console.log("Auction Initiated successfully.");
    },
    onError: (error) => {
      console.error("Error Initiating Auction:", error);
    },
  });
};
