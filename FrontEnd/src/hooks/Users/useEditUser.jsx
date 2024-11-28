import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminService } from '../../services/admin/manageUsers';

export const useEditUsers = (token) => {
  const { editUserProfile } = useAdminService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, user}) =>
        editUserProfile(token, id, user),   
     onSuccess: () => {
        queryClient.invalidateQueries(['users']);
    },
  });
};
