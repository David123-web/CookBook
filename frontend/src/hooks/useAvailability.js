import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAvailabilityAPI, removeAvailabilityAPI } from '../api/availability';
import { useAuth } from '../context/AuthContext';

export function useAddAvailability() {
  const { user, refreshUser } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['availability', user?.id, 'add'],
    mutationFn: ({ date }) => addAvailabilityAPI(user.id, date),
    onSuccess: (_, variables) => {
      // refresh chef detail and user availability
      qc.invalidateQueries(['chef', user.id]);
      refreshUser();
    },
  });
}

export function useRemoveAvailability() {
  const { user, refreshUser } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['availability', user?.id, 'remove'],
    mutationFn: ({ date }) => removeAvailabilityAPI(user.id, date),
    onSuccess: () => {
      qc.invalidateQueries(['chef', user.id]);
      refreshUser();
    },
  });
}