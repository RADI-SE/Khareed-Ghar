import { useQuery } from '@tanstack/react-query';
import { useSellerService } from "../../../services/seller/sellerServices";

export const useFetchNotifications = () => {
  const { getNotifications } = useSellerService();
  return useQuery({
    queryKey: ['notifications'], 
    queryFn: () => getNotifications(),
  });
};
