'use client';

import TextField from '@/components/textfield';
import { useChatAdmin } from '@/hooks/admin/useChat';
import { capitalizeFirst, normalizedDateTime } from '@/lib/utils';
import { Channel } from '@/models/channel';
import { Message } from '@/models/message';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';

export default function AdminChatPage() {
  const [selectedChannel, setSelectedChannel] = useState('');
  const [search, setSearch] = useState('');
  const { getAllChannels, getMessageByChannel } = useChatAdmin(selectedChannel);

  const filteredChannels = getAllChannels.data?.data?.filter((b: Channel) =>
    b.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className='h-full p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản Lý Trò Chuyện</h1>
      <hr className='my-8 border-gray-400' />
      <div className='h-[calc(100vh-11rem)] flex rounded-lg border border-gray-300 overflow-hidden bg-gradient-to-b from-violet-300 via-violet-200 to-blue-100 shadow-lg'>
        <div className='grow-1'>
          <TextField
            name='chat'
            fullWidth
            placeholder='Tìm kiếm theo tên cuộc trò chuyện'
            endIcon={<MagnifyingGlassIcon className='w-5 h-5' />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className='overflow-y-auto h-[calc(100vh-15rem)]'>
            {filteredChannels?.map((channel: Channel) => (
              <div
                key={channel.channel_url}
                className={clsx(
                  'p-3',
                  'mb-2',
                  'mx-4',
                  'rounded-xl',
                  { 'bg-white/50': selectedChannel === channel.channel_url },
                  'backdrop-blur-xl',
                  'border',
                  'border-white/30',
                  'shadow-md',
                  'cursor-pointer',
                  'hover:bg-white/50',
                )}
                onClick={() => setSelectedChannel(channel.channel_url)}
              >
                <div className='text-sm font-medium mb-2'>{channel.name}</div>
                <div className='flex justify-between'>
                  <div className='text-sm text-gray-600 truncate font-semibold'>
                    {`${channel.last_message?.user?.nickname}: ${channel.last_message?.message}`}
                  </div>
                  <div className='text-sm text-gray-600 font-semibold'>
                    {normalizedDateTime(channel.last_message?.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='w-px bg-white shrink-0' />
        <div className='grow-5 flex flex-col'>
          <div className='p-4 border-b border-white'>
            <h2 className='font-semibold'>Chi Tiết Cuộc Trò Chuyện</h2>
          </div>
          <div className='overflow-y-auto h-full'>
            {selectedChannel === '' ||
            getMessageByChannel.data?.data?.length === 0 ? (
              <div className='flex p-4 h-full items-center justify-center'>
                <p className='text-gray-500 font-semibold text-sm text-center'>
                  Hãy chọn một cuộc trò chuyện, nếu đã chọn và vẫn không thấy
                  tin nhắn, có thể đã xảy ra lỗi, vui lòng thử lại sau.
                </p>
              </div>
            ) : (
              <div className='p-4 flex flex-col justify-end'>
                {getMessageByChannel.data?.data?.map(
                  (message: Message, index: number) => {
                    const isEndUser = message.user?.role === 'user';

                    return (
                      <div key={index}>
                        <p
                          className={clsx(
                            'text-xs',
                            'font-bold',
                            isEndUser ? 'text-end' : 'text-start',
                            'text-gray-700',
                            'mb-1',
                          )}
                        >
                          {`${message.user?.nickname}-${message.user?.user_id} (${capitalizeFirst(message.user?.role)})`}
                        </p>
                        <div
                          className={clsx(
                            'flex',
                            'justify-start',
                            'gap-2',
                            isEndUser ? 'flex-row-reverse' : 'flex-row',
                            'items-end',
                            'mb-4',
                          )}
                        >
                          <div
                            className={clsx(
                              'rounded-2xl',
                              'border',
                              'border-white/30',
                              'p-2',
                              'backdrop-blur-xl',
                              isEndUser
                                ? 'bg-white/50'
                                : 'bg-gradient-to-r from-rose-300 to-rose-400',
                              'max-w-1/2',
                              'shadow-md',
                            )}
                          >
                            {message.message}
                          </div>
                          <p className='text-xs text-gray-500 font-semibold'>
                            {normalizedDateTime(message.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
