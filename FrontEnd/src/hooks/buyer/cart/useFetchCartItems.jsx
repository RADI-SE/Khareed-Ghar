import { useQuery } from '@tanstack/react-query';
import { useCartService } from "../../../services/buyer/buyerServices";

export const useFetchCartItems = () => {
    const { displayCart } = useCartService();
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => displayCart(),
    staleTime: 1000,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};
