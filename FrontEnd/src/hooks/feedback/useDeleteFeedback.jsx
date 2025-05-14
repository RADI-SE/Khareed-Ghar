import { useMutation } from "@tanstack/react-query";
import { useBuyerService } from "../../services/buyer/buyerServices";

export const useDeleteFeedback = () => {
  const { deleteBuyerFeedback } = useBuyerService();
  return useMutation({
    mutationFn: ({ feedbackId }) => 
      deleteBuyerFeedback( feedbackId),  
 
  });
};
