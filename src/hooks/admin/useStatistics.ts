'use client';

import { useQuery } from '@tanstack/react-query';
import {
  generalStatistic,
  getTopSellingProductItem,
  statisticByBrand,
  statisticByCate,
  statisticByStatus,
  statisticByTime,
} from '@/services/admin/statisticService';

export default function useStatistics() {
  const getByTime = useQuery({
    queryKey: ['by-time'],
    queryFn: statisticByTime,
  });

  const getByStatus = useQuery({
    queryKey: ['by-status'],
    queryFn: statisticByStatus,
  });

  const general = useQuery({
    queryKey: ['general'],
    queryFn: generalStatistic,
  });

  const getBySellingProductItem = useQuery({
    queryKey: ['by-selling-product-item'],
    queryFn: getTopSellingProductItem,
  });

  const getByBrand = useQuery({
    queryKey: ['by-brand'],
    queryFn: statisticByBrand,
  });

  const getByCate = useQuery({
    queryKey: ['by-cate'],
    queryFn: statisticByCate,
  });

  return {
    general,
    getByBrand,
    getByCate,
    getBySellingProductItem,
    getByStatus,
    getByTime,
  };
}
