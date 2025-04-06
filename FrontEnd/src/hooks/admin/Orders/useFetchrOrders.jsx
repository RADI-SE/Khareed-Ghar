import { useQuery } from '@tanstack/react-query';
import { useOrderService } from "../../../services/orderServices";

export const useFetchOrders = () => {
    const { getAllOrders } = useOrderService();
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => getAllOrders(),
    staleTime: 0, 
    refetchInterval: 5000,  
    refetchIntervalInBackground: true,  
  });
};