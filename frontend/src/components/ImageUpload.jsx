import React, { useState } from 'react';
import { useUploadProfileImage } from '../hooks/useImageUpload';
import { Button } from './ui/button';

export default function ImageUpload({ currentImage, onUploadSuccess }) {
  const [preview, setPreview] = useState(currentImage || '');
  const { mutate, isLoading, isError, error } = useUploadProfileImage();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    mutate(file, {
      onSuccess: (data) => {
        onUploadSuccess(data.imageUrl);
      },
    });
  };

  return (
    <div className="max-w-xs mx-auto p-4 bg-white rounded-lg shadow space-y-4">
      {preview && (
        <img
          src={preview}
          alt="Avatar preview"
          className="w-32 h-32 rounded-full object-cover mx-auto"
        />
      )}

      <div className="text-center">
        <Button asChild>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
            {preview ? 'Change Photo' : 'Upload Photo'}
          </label>
        </Button>
      </div>

      {isLoading && (
        <p className="text-center text-gray-500">Uploading…</p>
      )}
      {isError && (
        <p className="text-center text-sm text-red-600">
          Error: {error.message}
        </p>
      )}
    </div>
  );
}