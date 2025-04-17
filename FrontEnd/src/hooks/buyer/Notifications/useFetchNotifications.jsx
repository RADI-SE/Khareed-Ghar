import { useQuery } from '@tanstack/react-query';
import { useSellerService } from "../../../services/seller/sellerServices";

export const useFetchNotifications = () => {
  const {  getBuyerNotifications } = useSellerService();
  return useQuery({
    queryKey: ['notifications'], 
    queryFn: () => getBuyerNotifications(),
  });
};
