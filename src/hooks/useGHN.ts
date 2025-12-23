import {
  getDistrictFromGHN,
  getProvinceFromGHN,
  getWardFromGHN,
} from '@/services/ghnService';
import { useQuery } from '@tanstack/react-query';

export function useGHN(provinceId?: number, districtId?: number) {
  const getDistrict = useQuery({
    queryKey: ['get-district', provinceId],
    queryFn: () => getDistrictFromGHN(provinceId!),
    enabled: provinceId !== undefined && provinceId !== 0,
  });

  const getWard = useQuery({
    queryKey: ['get-ward', districtId],
    queryFn: () => getWardFromGHN(districtId!),
    enabled: districtId !== undefined && districtId !== 0,
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
