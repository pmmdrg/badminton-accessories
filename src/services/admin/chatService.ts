import api from '@/lib/api';

export async function getAllChannelsAdmin() {
  const res = await api.get('/admin/sendbird/get-all-group-channels');

  return res.data;
}

export async function getAllMessagesByChannelAdmin(channelUrl: string) {
  const res = await api.get(
    `/admin/sendbird/get-messages-from-group-channel?channelUrl=${channelUrl}`,
  );

  return res.data;
}
