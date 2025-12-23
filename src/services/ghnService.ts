import axios from 'axios';

const ghnApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Token: '2114fc03-ddca-11f0-b3af-9ad0dcdbe88c',
  },
});

export async function getDistrictFromGHN(provinceId: number) {
  const res = await ghnApi.post(
    'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
    { province_id: provinceId }
  );

  return res.data;
}

export async function getWardFromGHN(districtId: number) {
  const res = await ghnApi.get(
    'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward',
    {
      params: { district_id: districtId },
    }
  );

  return res.data;
}

export async function getProvinceFromGHN() {
  const res = await ghnApi.get(
    'https://online-gateway.ghn.vn/shiip/public-api/master-data/province'
  );

  return res.data;
}
