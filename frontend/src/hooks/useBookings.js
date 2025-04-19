import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchBookingsAPI,
  createBookingAPI,
  deleteBookingAPI,
} from '../api/bookings';
import { useAuth } from '../context/AuthContext';

export function useBookings() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['bookings', user.id, user.type],
    queryFn: () => fetchBookingsAPI(user.id, user.type),
    enabled: !!user,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['bookings', 'create'],
    mutationFn: createBookingAPI,
    onSuccess: () => {
      // refetch bookings for current user
      queryClient.invalidateQueries(['bookings']);
    },
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['bookings', 'delete'],
    mutationFn: deleteBookingAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
    },
  });
}