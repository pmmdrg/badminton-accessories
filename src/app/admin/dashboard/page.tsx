'use client';

import { Spinner } from '@/components/spinner';
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
      <div className='bg-gradient-to-br from-blue-200 to-green-100 rounded-xl shadow-md p-6 w-full'>
        <h2 className='text-xl font-bold mb-4'>Tổng Quan</h2>

        <div className='w-full h-80'>
          {getByTime.isLoading ? (
            <Spinner size='lg' />
          ) : (
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={getByTime.data.data.byDay || []}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' stroke='#111827' />
                <YAxis stroke='#111827' />

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
        <div className='bg-gradient-to-br from-blue-200 to-yellow-100 shadow-md rounded-xl p-6'>
          <h2 className='text-lg font-bold mb-4'>Thống Kê Tháng</h2>

          {general.isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className='flex gap-4'>
                <div className='rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl p-4 text-center flex-1'>
                  <p className='text-black text-md font-semibold'>
                    Số Đơn Hàng
                  </p>
                  <p className='text-xl font-bold text-rose-700'>
                    {general.data.data.totalOrders}
                  </p>
                </div>

                <div className='rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl p-4 text-center flex-1'>
                  <p className='text-black text-md font-semibold'>
                    Số Khách Hàng
                  </p>
                  <p className='text-xl font-bold text-rose-700'>
                    {general.data.data.totalUsersBought}
                  </p>
                </div>

                <div className='rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl p-4 text-center flex-1'>
                  <p className='text-black text-md font-semibold'>
                    Số Sản Phẩm Đã Bán
                  </p>
                  <p className='text-xl font-bold text-rose-700'>
                    {general.data.data.totalProductItemSold}
                  </p>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl p-4 text-center flex-1 mt-4'>
                  <p className='text-black text-md font-semibold'>
                    Doanh Thu Theo Phương Thức Thanh Toán
                  </p>
                  <table className='w-full text-sm border-collapse'>
                    <thead>
                      <tr className='border-b border-gray-400'>
                        <th className='p-2 font-semibold'>Phương Thức</th>
                        <th className='p-2 font-semibold'>Doanh Thu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {general.data.data.revenueByPayment.map(
                        (
                          payment: {
                            namePayment: string;
                            totalRevenue: number;
                          },
                          index: number,
                        ) => (
                          <tr
                            key={`payment-${payment.namePayment || index}`}
                            className='border-b border-gray-400'
                          >
                            <td className='text-lg font-bold text-rose-700 p-2'>
                              {payment.namePayment}
                            </td>
                            <td className='text-lg font-bold text-rose-700 p-2'>
                              {payment.totalRevenue.toLocaleString(
                                COUNTRY_CODE.VN,
                              )}
                              ₫
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
                <div className='rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl p-4 text-center flex-1 mt-4'>
                  <p className='text-black text-md font-semibold'>
                    Doanh Thu Theo Tháng
                  </p>
                  <table className='w-full text-sm border-collapse'>
                    <thead>
                      <tr className='border-b border-gray-400'>
                        <th className='p-2 font-semibold'>Tháng</th>
                        <th className='p-2 font-semibold'>Doanh Thu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {general.data.data.revenueByMonth.map(
                        (
                          month: {
                            id: { month: number; year: number };
                            totalRevenue: number;
                          },
                          index: number,
                        ) => (
                          <tr
                            key={`month-${month.id.year}-${month.id.month}-${index}`}
                            className='border-b border-gray-400'
                          >
                            <td className='text-lg font-bold text-rose-700 p-2'>
                              {month.id.month}/{month.id.year}
                            </td>
                            <td className='text-lg font-bold text-rose-700 p-2'>
                              {month.totalRevenue.toLocaleString(
                                COUNTRY_CODE.VN,
                              )}
                              ₫
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        <div className='bg-gradient-to-br from-red-200 to-orange-100 shadow-md rounded-xl p-6'>
          <h2 className='text-lg font-bold mb-4'>Top Sản Phẩm Bán Chạy</h2>
          <div className='flex gap-8'>
            <table className='w-full text-sm border-collapse'>
              <thead>
                <tr className='border-b border-gray-400'>
                  <th className='p-2 text-left font-semibold'>Sản phẩm</th>
                  <th className='p-2 text-left font-semibold'>SL</th>
                </tr>
              </thead>

              <tbody>
                {getBySellingProductItem.isLoading ? (
                  <tr>
                    <td colSpan={2}>Đang tải dữ liệu</td>
                  </tr>
                ) : (
                  getBySellingProductItem.data.data.topByQuantity.map(
                    (
                      pi: {
                        productItemId: string;
                        nameProductItem: string;
                        totalQuantitySold: number;
                      },
                      index: number,
                    ) => (
                      <tr
                        key={`quantity-${pi.productItemId || index}`}
                        className='border-b border-gray-400'
                      >
                        <td className='p-2'>{pi.nameProductItem}</td>
                        <td className='p-2 text-rose-700 font-bold'>
                          {pi.totalQuantitySold}
                        </td>
                      </tr>
                    ),
                  )
                )}
              </tbody>
            </table>

            <table className='w-full text-sm border-collapse'>
              <thead>
                <tr className='border-b border-gray-400'>
                  <th className='p-2 text-left font-semibold'>Sản phẩm</th>
                  <th className='p-2 text-left font-semibold'>Doanh Thu</th>
                </tr>
              </thead>

              <tbody>
                {getBySellingProductItem.isLoading ? (
                  <tr>
                    <td colSpan={2}>Đang tải dữ liệu</td>
                  </tr>
                ) : (
                  getBySellingProductItem.data.data.topByRevenue.map(
                    (
                      pi: {
                        productItemId: string;
                        nameProductItem: string;
                        totalRevenue: number;
                      },
                      index: number,
                    ) => (
                      <tr
                        key={`revenue-${pi.productItemId || index}-${pi.nameProductItem || index}`}
                        className='border-b border-gray-400'
                      >
                        <td className='p-2'>{pi.nameProductItem}</td>
                        <td className='p-2 text-rose-700 font-bold'>
                          {pi.totalRevenue.toLocaleString(COUNTRY_CODE.VN)}₫
                        </td>
                      </tr>
                    ),
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-gradient-to-br from-violet-200 to-orange-100 shadow-md rounded-xl p-6'>
          <h2 className='text-lg font-bold mb-4'>Top Thương Hiệu</h2>

          <table className='w-full text-sm border-collapse'>
            <thead>
              <tr className='border-b border-gray-400'>
                <th className='p-2 text-left font-semibold'>Thương Hiệu</th>
                <th className='p-2 text-left font-semibold'>SL</th>
                <th className='p-2 text-left font-semibold'>Doanh Thu</th>
              </tr>
            </thead>

            <tbody>
              {getByBrand.isLoading ? (
                <tr>
                  <td colSpan={3}>Đang tải dữ liệu</td>
                </tr>
              ) : (
                getByBrand.data.data.map(
                  (
                    brand: {
                      brandId: string;
                      nameBrand: string;
                      totalQuantitySold: number;
                      totalRevenue: number;
                    },
                    index: number,
                  ) => (
                    <tr
                      key={`brand-${brand.brandId || index}`}
                      className='border-b border-gray-400'
                    >
                      <td className='p-2'>{brand.nameBrand}</td>
                      <td className='p-2 text-rose-700 font-bold'>
                        {brand.totalQuantitySold}
                      </td>
                      <td className='p-2 text-rose-700 font-bold'>
                        {brand.totalRevenue.toLocaleString(COUNTRY_CODE.VN)}₫
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>

        <div className='bg-gradient-to-br from-orange-200 to-pink-100 shadow-md rounded-xl p-6'>
          <h2 className='text-lg font-semibold mb-4'>Top Danh Mục</h2>

          <table className='w-full text-sm border-collapse'>
            <thead>
              <tr className='border-b border-gray-400'>
                <th className='p-2 text-left font-semibold'>Danh Mục</th>
                <th className='p-2 text-left font-semibold'>SL</th>
                <th className='p-2 text-left font-semibold'>Doanh Thu</th>
              </tr>
            </thead>

            <tbody>
              {getByCate.isLoading ? (
                <tr>
                  <td colSpan={3}>Đang tải dữ liệu</td>
                </tr>
              ) : (
                getByCate.data.data.map(
                  (
                    cate: {
                      cateId: string;
                      nameCate: string;
                      totalQuantitySold: number;
                      totalRevenue: number;
                    },
                    index: number,
                  ) => (
                    <tr
                      key={`cate-${cate.cateId || index}`}
                      className='border-b border-gray-400'
                    >
                      <td className='p-2'>{cate.nameCate}</td>
                      <td className='p-2 text-rose-700 font-bold'>
                        {cate.totalQuantitySold}
                      </td>
                      <td className='p-2 text-rose-700 font-bold'>
                        {cate.totalRevenue.toLocaleString(COUNTRY_CODE.VN)}₫
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
