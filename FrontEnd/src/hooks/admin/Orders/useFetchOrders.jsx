import { useQuery } from '@tanstack/react-query';
import { useOrderService } from "../../../services/orderServices";

export const useFetchOrders = () => {
    const { getOrders } = useOrderService();
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
    staleTime: 0, 
    refetchInterval: 5000,  
    refetchIntervalInBackground: true,  
  });
};