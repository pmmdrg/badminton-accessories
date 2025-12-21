import axios from 'axios';

export async function getDistrictFromGHN() {
  const res = await axios.get(
    'https://online-gateway.ghn.vn/shiip/public-api/master-data/district'
  );

  return res.data;
}

export async function getWardFromGHN() {
  const res = await axios.get(
    'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward'
  );

  return res.data;
}

export async function getProvinceFromGHN() {
  const res = await axios.get(
    'https://online-gateway.ghn.vn/shiip/public-api/master-data/province'
  );

  return res.data;
}
