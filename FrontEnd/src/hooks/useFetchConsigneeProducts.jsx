import { useQuery } from '@tanstack/react-query';
import { useConsigneeService } from "../services/consignee/consigneeServices";  

export const useFetchConsigneeProducts = () => {
  const { getConsigneeProducts } = useConsigneeService();
  
  return useQuery({
    queryKey: ['consigneeProducts'],
    queryFn: async () => {
      const products = await getConsigneeProducts();
      console.log("Products in hook:", products);
      return products;
    },
    enabled: true,
    staleTime: 0,
    refetchInterval: 5000,
    onError: (error) => {
      console.error("Error fetching consignee products:", error);
    },
    onSuccess: (data) => {
      console.log("Consignee products fetched successfully:", data);
    }
  });
};
