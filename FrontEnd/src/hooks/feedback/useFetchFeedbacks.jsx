import { useQuery } from '@tanstack/react-query';
import { useBuyerService } from '../../services/buyer/buyerServices';
export const useFetchFeedbacks = (id) => {
    const { getProductFeedback } = useBuyerService();
  return useQuery({
    queryKey: ['feedbacks'],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(async () => {
          const feedbacks = await getProductFeedback(id);
          resolve(feedbacks);
        }, 1000); 
      }),
    staleTime: 5000, 
    refetchInterval: 5000, 
    refetchIntervalInBackground: true,
    
  });
};


 