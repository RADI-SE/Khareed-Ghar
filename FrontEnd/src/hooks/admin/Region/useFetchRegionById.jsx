import { useQuery } from '@tanstack/react-query';
import { useAdminService } from "../../../services/admin/useRegionServices/useRegionServices";


export const useFetchRegionById = (id) => {
  const {getRegionById } = useAdminService();
  return useQuery({
    queryKey: ['region', id], 
    queryFn: () => getRegionById(id),
    enabled: !!id,
  });
};
