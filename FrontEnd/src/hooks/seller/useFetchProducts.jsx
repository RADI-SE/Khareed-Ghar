import { useQuery } from '@tanstack/react-query';
import { useSellerService } from "../../services/seller/sellerServices";

export const useFetchProducts = () => {
    const { getProducts } = useSellerService();
  return useQuery({
    queryKey: ['product'],
    queryFn: () => getProducts(),
    staleTime: 0, 
    refetchInterval: 5000,  
    refetchIntervalInBackground: true,  
  });
};
