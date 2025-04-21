import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchReviewsAPI, createReviewAPI } from '../api/reviews';
import { useAuth } from '../context/AuthContext';

export function useReviews(chefId) {
  return useQuery({
    queryKey: ['reviews', chefId],
    queryFn: () => fetchReviewsAPI(chefId),
    enabled: !!chefId,
    staleTime: 5 * 60 * 1000, // optional cache time
  });
}

export function useCreateReview(chefId) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationKey: ['reviews', chefId, 'create'],
    mutationFn: ({ rating, comment }) =>
      createReviewAPI(chefId, rating, comment, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', chefId] });
    },
  });
}