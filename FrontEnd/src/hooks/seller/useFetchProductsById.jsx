import { useQuery } from '@tanstack/react-query';
import { useSellerService } from "../../services/seller/sellerServices";

export const useFetchProductById = (id) => {
  const { getProductById } = useSellerService();
  return useQuery({
    queryKey: ['products', id], 
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
