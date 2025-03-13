import { useQuery } from '@tanstack/react-query';
import { useSellerService } from "../../../services/seller/sellerServices";

export const useFetchAuctions = () => {
    const { getAuctions } = useSellerService();
    return useQuery({
        queryKey: ['auctions'],
        queryFn: () => getAuctions(),
        staleTime: 0, 
        refetchInterval: 5000,  // Refetch every 5 seconds
        refetchIntervalInBackground: true,  // Continue refetching in background
    });
};
