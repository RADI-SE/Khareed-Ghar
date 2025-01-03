import { useQuery } from '@tanstack/react-query';
import { useSellerService } from "../../services/seller/sellerServices";

export const useFetchProductsByUserId = (id) => {
 
  const { getUserProducts } = useSellerService();
  return useQuery({
    queryKey: ['products'], 
    queryFn: () => getUserProducts(id),
    enabled: !!id,
  });
};
