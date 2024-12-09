import { useQuery } from '@tanstack/react-query';
import { useAdminService } from "../../../services/admin/useZoonServices/useZoonServices";


export const useFetchZoonById = (id) => {
  console.log("id from useFetchById:",id);
  const {getZoonById } = useAdminService();
  return useQuery({
    queryKey: ['zoon', id], 
    queryFn: () => getZoonById(id),
    enabled: !!id,
  });
};
