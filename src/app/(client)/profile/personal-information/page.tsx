'use client';

import { placeholderImage } from '@/assets/images';
import Button from '@/components/custom/button';
import TextField from '@/components/custom/textfield';
import { UploadProgress } from '@/components/custom/uploadProgress';
import { useUserClient } from '@/hooks/client/useUser';
import { useUpload } from '@/hooks/useUpload';
import { isValidImageSrc } from '@/lib/utils';
import { PencilIcon } from '@heroicons/react/24/outline';
import { upload } from '@imagekit/next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PersonalInformationPage() {
  const { getIKToken } = useUpload();
  const { getInfo, editUser } = useUserClient();
  const [fullname, setFullname] = useState('');
  const [progress, setProgress] = useState(0);
  const [bio, setBio] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpdate = async () => {
    let imageUrl = '';

    if (file) {
      await getIKToken.mutateAsync(file);

      if (getIKToken.isSuccess) {
        const res = await upload({
          file,
          fileName: file.name,
          signature: getIKToken.data.signature,
          token: getIKToken.data.token,
          expire: getIKToken.data.expire,
          publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY || '',
          onProgress: (e) =>
            setProgress(Math.round((e.loaded / e.total) * 100)),
        });

        imageUrl = res.url ?? '';

        editUser.mutate({
          avatar: imageUrl,
          bio,
          fullname,
        });
      }
    } else {
      editUser.mutate({
        avatar: imageUrl,
        bio,
        fullname,
      });
    }
  };

  useEffect(() => {
    if (!getInfo.data?.data) return;

    setFullname(getInfo.data.data.fullname);
    setBio(getInfo.data.data.bio);
    setPreview(getInfo.data.data.avatar);
  }, [getInfo.data]);

  return (
    <div className=' flex justify-center items-start py-10'>
      <UploadProgress value={progress} />
      <div className='w-full max-w-xl bg-white rounded-2xl shadow p-6'>
        <h1 className='text-2xl font-bold text-center mb-6'>
          Thông tin cá nhân
        </h1>

        <div className='flex justify-center mb-6'>
          <div className='w-32 h-32 relative rounded-full border border-rose-700'>
            <Image
              src={isValidImageSrc(preview) ? preview : placeholderImage}
              alt='Avatar'
              fill
              className='object-cover rounded-full'
            />
            <div className='absolute inset-0 flex items-end justify-end'>
              <div className='w-10 h-10 bg-white flex items-center justify-center inset-ring  rounded-full inset-ring-rose-700'>
                <PencilIcon className='w-5 h-5' />

                <input
                  name='avatar'
                  type='file'
                  accept='image/*'
                  className='absolute inset-0 opacity-0 cursor-pointer'
                  onChange={handleSelectImage}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='font-medium'>Họ và tên</label>
            <TextField
              name='fullname'
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder='Nhập họ và tên'
              className='border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500'
              fullWidth
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='font-medium'>Tiểu sử</label>
            <TextField
              name='bio'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder='Giới thiệu ngắn về bản thân'
              className='border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-rose-500'
              fullWidth
            />
          </div>

          <Button onClick={handleUpdate}>Cập nhật thông tin cá nhân</Button>
        </div>
      </div>
    </div>
  );
}
