import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminService } from '../../services/admin/manageUsers';
export const useBanUsers = (token) => {
  const { banUsers } = useAdminService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({  id, role }) =>
        banUsers(token, id, role),   
     onSuccess: () => {
        queryClient.invalidateQueries(['users']);
    },
  });
};
