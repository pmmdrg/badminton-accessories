'use client';
import { useMutation } from '@tanstack/react-query';
import { getImageKitToken } from '@/services/uploadService';

export function useUpload() {
  const getIKToken = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();

      formData.append('file', file);

      const res = await getImageKitToken(formData);

      return res;
    },
  });

  return { getIKToken };
}
