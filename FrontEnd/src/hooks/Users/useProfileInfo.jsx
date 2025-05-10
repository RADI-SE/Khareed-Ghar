import { useQuery } from '@tanstack/react-query';
import { userProfileServices } from '../../services/userProfileServices';
export const useProfileInfo = () => {
    const { getUserProfile } = userProfileServices();
  return useQuery({
    queryKey: ['user'],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(async () => {
          const users = await getUserProfile();
          resolve(users);
        }, 1000); 
      }),
    staleTime: 5000, 
    refetchInterval: 5000, 
    refetchIntervalInBackground: true,
    
  });
};


 