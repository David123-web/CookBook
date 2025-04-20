import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadProfileImageAPI } from '../api/imageUpload';
import { useAuth } from '../context/AuthContext';

export function useUploadProfileImage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['profileImageUpload'],
    mutationFn: (file) => uploadProfileImageAPI(file, user.id),
    onSuccess: () => {
      // Invalidate all related queries so UI refreshes
      queryClient.invalidateQueries({ queryKey: ['chefs'] });
      queryClient.invalidateQueries({ queryKey: ['chef', user.id] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
}