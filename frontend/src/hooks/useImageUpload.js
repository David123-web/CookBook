import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadProfileImageAPI } from '../api/imageUpload';

export function useUploadProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['profileImageUpload'],
    mutationFn: (file) => uploadProfileImageAPI(file),
    onSuccess: () => {
      // Invalidate all related queries so UI refreshes
      queryClient.invalidateQueries({ queryKey: ['chefs'] });
      queryClient.invalidateQueries({ queryKey: ['chef'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
}