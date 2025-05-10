import { useQuery } from '@tanstack/react-query';
import { useOrderService } from "../../../services/orderServices";

export const useFetchUserOrders = () => {
    const { getUserOrders } = useOrderService();
  return useQuery({
    queryKey: ['user-orders'],
    queryFn: () => getUserOrders(),
    staleTime: 0, 
    refetchInterval: 5000,  
    refetchIntervalInBackground: true,  
  });
};