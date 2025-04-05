import { useQuery } from "@tanstack/react-query";
import { useSellerService } from "../../../services/seller/sellerServices";

export const useCurrentLeftTime = (id) => {
  const { getCurrentLeftTime } = useSellerService();
  return useQuery({
    queryKey: ["currentLeftTime", id],
    queryFn: () => getCurrentLeftTime(id),
    enabled: !!id,  
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  }
);

};
