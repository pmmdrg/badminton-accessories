'use client';

import { Spinner } from '@/components/custom/spinner';
import useStatistics from '@/hooks/admin/useStatistics';
import { COUNTRY_CODE } from '@/lib/constants';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function DashboardPage() {
  const { getByTime, getByBrand, getByCate, getBySellingProductItem, general } =
    useStatistics();

  return (
    <div className='p-6 space-y-6'>
      <div className='bg-white rounded-xl shadow-md p-6 w-full'>
        <h2 className='text-xl font-semibold mb-4'>Tổng Quan</h2>

        <div className='w-full h-80'>
          {getByTime.isLoading ? (
            <Spinner size='lg' />
          ) : (
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={getByTime.data.data.byDay || []}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />

                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'revenue')
                      return [
                        `${value.toLocaleString(COUNTRY_CODE.VN)}₫`,
                        'Doanh thu',
                      ];
                    if (name === 'orderCount') return [value, 'Số đơn hàng'];
                    return [value, name];
                  }}
                />
                <Line
                  type='monotone'
                  dataKey='revenue'
                  stroke='#f43f5e'
                  strokeWidth={2}
                />
                <Line
                  type='monotone'
                  dataKey='orderCount'
                  stroke='#2d27a1'
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white shadow-md rounded-xl p-6'>
          <h2 className='text-lg font-semibold mb-4'>Thống Kê Tháng</h2>

          {general.isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className='flex gap-4'>
                <div className='bg-rose-50 border border-rose-200 rounded-xl p-4 text-center flex-1'>
                  <p className='text-gray-600 text-sm'>Số Đơn Hàng</p>
                  <p className='text-xl font-bold text-rose-700'>
                    {general.data.data.totalOrders}
                  </p>
                </div>

                <div className='bg-rose-50 border border-rose-200 rounded-xl p-4 text-center flex-1'>
                  <p className='text-gray-600 text-sm'>Số Khách Hàng</p>
                  <p className='text-xl font-bold text-rose-700'>
                    {general.data.data.totalUsersBought}
                  </p>
                </div>

                <div className='bg-rose-50 border border-rose-200 rounded-xl p-4 text-center flex-1'>
                  <p className='text-gray-600 text-sm'>Số Sản Phẩm Đã Bán</p>
                  <p className='text-xl font-bold text-rose-700'>
                    {general.data.data.totalProductItemSold}
                  </p>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='bg-rose-50 border border-rose-200 rounded-xl p-4 text-center flex-1 mt-4'>
                  <p className='text-gray-600 text-sm'>
                    Doanh Thu Theo Phương Thức Thanh Toán
                  </p>
                  <table className='w-full text-sm border-collapse'>
                    <thead>
                      <tr className='border-b border-gray-400'>
                        <th className='p-2'>Phương Thức</th>
                        <th className='p-2'>Doanh Thu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {general.data.data.revenueByPayment.map(
                        (payment: { _id: string; totalRevenue: number }) => (
                          <tr
                            key={payment._id}
                            className='border-b border-gray-400'
                          >
                            <td className='text-lg font-bold text-rose-700 p-2'>
                              {payment._id}
                            </td>
                            <td className='text-lg font-bold text-rose-700 p-2'>
                              {payment.totalRevenue.toLocaleString(
                                COUNTRY_CODE.VN
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div className='bg-rose-50 border border-rose-200 rounded-xl p-4 text-center flex-1 mt-4'>
                  <p className='text-gray-600 text-sm'>Doanh Thu Theo Tháng</p>
                  <table className='w-full text-sm border-collapse'>
                    <thead>
                      <tr className='border-b border-gray-400'>
                        <th className='p-2'>Tháng</th>
                        <th className='p-2'>Doanh Thu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {general.data.data.revenueByMonth.map(
                        (month: {
                          _id: { month: number; year: number };
                          totalRevenue: number;
                        }) => (
                          <tr
                            key={month._id.month}
                            className='border-b border-gray-400'
                          >
                            <td className='text-lg font-bold text-rose-700 p-2'>
                              {month._id.month}/{month._id.year}
                            </td>
                            <td className='text-lg font-bold text-rose-700 p-2'>
                              {month.totalRevenue.toLocaleString(
                                COUNTRY_CODE.VN
                              )}
                              ₫
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        <div className='bg-white shadow-md rounded-xl p-6'>
          <h2 className='text-lg font-semibold mb-4'>Top Sản Phẩm Bán Chạy</h2>
          <div className='flex gap-8'>
            <table className='w-full text-sm border-collapse'>
              <thead>
                <tr className='border-b border-gray-400'>
                  <th className='p-2 text-left'>Sản phẩm</th>
                  <th className='p-2 text-left'>SL</th>
                </tr>
              </thead>

              <tbody>
                {getBySellingProductItem.isLoading ? (
                  <tr>
                    <td colSpan={2}>Đang tải dữ liệu</td>
                  </tr>
                ) : (
                  getBySellingProductItem.data.data.topByQuantity.map(
                    (pi: {
                      productItemId: string;
                      nameProductItem: string;
                      totalQuantitySold: number;
                    }) => (
                      <tr
                        key={pi.productItemId}
                        className='border-b border-gray-400'
                      >
                        <td className='p-2'>{pi.nameProductItem}</td>
                        <td className='p-2'>{pi.totalQuantitySold}</td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>

            <table className='w-full text-sm border-collapse'>
              <thead>
                <tr className='border-b border-gray-400'>
                  <th className='p-2 text-left'>Sản phẩm</th>
                  <th className='p-2 text-left'>Doanh Thu</th>
                </tr>
              </thead>

              <tbody>
                {getBySellingProductItem.isLoading ? (
                  <tr>
                    <td colSpan={2}>Đang tải dữ liệu</td>
                  </tr>
                ) : (
                  getBySellingProductItem.data.data.topByRevenue.map(
                    (pi: {
                      productItemId: string;
                      nameProductItem: string;
                      totalRevenue: number;
                    }) => (
                      <tr
                        key={pi.productItemId}
                        className='border-b border-gray-400'
                      >
                        <td className='p-2'>{pi.nameProductItem}</td>
                        <td className='p-2'>
                          {pi.totalRevenue.toLocaleString(COUNTRY_CODE.VN)}₫
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white shadow-md rounded-xl p-6'>
          <h2 className='text-lg font-semibold mb-4'>Top Thương Hiệu</h2>

          <table className='w-full text-sm border-collapse'>
            <thead>
              <tr className='border-b border-gray-400'>
                <th className='p-2 text-left'>Thương Hiệu</th>
                <th className='p-2 text-left'>SL</th>
                <th className='p-2 text-left'>Doanh Thu</th>
              </tr>
            </thead>

            <tbody>
              {getByBrand.isLoading ? (
                <tr>
                  <td colSpan={3}>Đang tải dữ liệu</td>
                </tr>
              ) : (
                getByBrand.data.data.map(
                  (brand: {
                    brandId: string;
                    nameBrand: string;
                    totalQuantitySold: number;
                    totalRevenue: number;
                  }) => (
                    <tr
                      key={brand.brandId}
                      className='border-b border-gray-400'
                    >
                      <td className='p-2'>{brand.nameBrand}</td>
                      <td className='p-2'>{brand.totalQuantitySold}</td>
                      <td className='p-2'>
                        {brand.totalRevenue.toLocaleString(COUNTRY_CODE.VN)}₫
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        <div className='bg-white shadow-md rounded-xl p-6'>
          <h2 className='text-lg font-semibold mb-4'>Top Danh Mục</h2>

          <table className='w-full text-sm border-collapse'>
            <thead>
              <tr className='border-b border-gray-400'>
                <th className='p-2 text-left'>Danh Mục</th>
                <th className='p-2 text-left'>SL</th>
                <th className='p-2 text-left'>Doanh Thu</th>
              </tr>
            </thead>

            <tbody>
              {getByCate.isLoading ? (
                <tr>
                  <td colSpan={3}>Đang tải dữ liệu</td>
                </tr>
              ) : (
                getByCate.data.data.map(
                  (cate: {
                    cateId: string;
                    nameCate: string;
                    totalQuantitySold: number;
                    totalRevenue: number;
                  }) => (
                    <tr key={cate.cateId} className='border-b border-gray-400'>
                      <td className='p-2'>{cate.nameCate}</td>
                      <td className='p-2'>{cate.totalQuantitySold}</td>
                      <td className='p-2'>
                        {cate.totalRevenue.toLocaleString(COUNTRY_CODE.VN)}₫
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
