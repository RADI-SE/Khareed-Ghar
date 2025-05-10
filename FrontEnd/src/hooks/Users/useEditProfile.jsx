import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userProfileServices } from '../../services/userProfileServices';

export const useEditProfile = () => {
  const { editUserProfile } = userProfileServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({user}) =>
        editUserProfile(user),   
     onSuccess: () => {
        queryClient.invalidateQueries(['users']);
    },
  });
};
