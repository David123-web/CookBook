import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchMessagesAPI,
  createMessageAPI,
  deleteMessageAPI,
  updateMessageAPI,
} from '../api/messages';
import { useAuth } from '../context/AuthContext';

export function useMessages(chefId) {
  return useQuery({
    queryKey: ['messages', chefId],
    queryFn: () => fetchMessagesAPI(chefId),
    enabled: !!chefId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateMessage(chefId) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationKey: ['messages', chefId, 'create'],
    mutationFn: (content) => createMessageAPI(chefId, content, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', chefId] });
    },
  });
}

export function useDeleteMessage(chefId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['messages', chefId, 'delete'],
    mutationFn: (id) => deleteMessageAPI(chefId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', chefId] });
    },
  });
}

export function useUpdateMessage(chefId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['messages', chefId, 'update'],
    mutationFn: ({ messageId, updates }) =>
      updateMessageAPI(chefId, messageId, updates),
    onSuccess: () => {
      // refresh the message list
      queryClient.invalidateQueries({ queryKey: ['messages', chefId] });
    },
  });
}