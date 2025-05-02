import { useQuery } from "@tanstack/react-query";
import { useOrderService } from "../../../services/orderServices";

const useGetBuyerOrders = (userId) => {
  const { getBuyerOrders } = useOrderService();

  return useQuery({
    queryKey: ["getBuyerOrders", userId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }
      try {
        const response = await getBuyerOrders({ userId });
        return response || [];
      } catch (error) {
        console.error("Error fetching buyer orders:", error);
        return [];
      }
    },
    staleTime: 5000, // Cache data for 5 seconds
    refetchInterval: 10000, // Refetch every 10 seconds
  });
};
export { useGetBuyerOrders } ;
export default useGetBuyerOrders;