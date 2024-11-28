import { useQuery } from '@tanstack/react-query';
import { useAdminService } from '../../services/admin/manageUsers';
export const useFetchUsers = (token , role) => {
    const { displayUser } = useAdminService();
  return useQuery({
    queryKey: ['users'],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(async () => {
          const users = await displayUser(token, role);
          resolve(users);
        }, 1000); 
      }),
    staleTime: 5000, 
    refetchInterval: 5000, 
    refetchIntervalInBackground: true,
    
  });
};


 