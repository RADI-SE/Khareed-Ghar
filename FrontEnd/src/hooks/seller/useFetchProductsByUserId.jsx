import { useQuery } from '@tanstack/react-query';
import { useSellerService } from "../../services/seller/sellerServices";

export const useFetchProductsByUserId = (id) => {
  const { getUserProducts } = useSellerService();
  
  
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => {
      return getUserProducts(id);
    },
    enabled: !!id,
    staleTime: 0,
    refetchInterval: 5000,
    onError: (error) => {
    },
    onSuccess: (data) => {
    }
  });
};
