import {
  getDistrictFromGHN,
  getProvinceFromGHN,
  getWardFromGHN,
} from '@/services/ghnService';
import { useQuery } from '@tanstack/react-query';

export function useGHN() {
  const getDistrict = useQuery({
    queryKey: ['get-district'],
    queryFn: getDistrictFromGHN,
  });

  const getWard = useQuery({
    queryKey: ['get-ward'],
    queryFn: getWardFromGHN,
  });

  const getProvince = useQuery({
    queryKey: ['get-province'],
    queryFn: getProvinceFromGHN,
  });

  return {
    getDistrict,
    getProvince,
    getWard,
  };
}
