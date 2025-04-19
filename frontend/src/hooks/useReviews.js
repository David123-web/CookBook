import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchReviewsAPI, createReviewAPI } from '../api/reviews';

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

  return useMutation({
    mutationKey: ['reviews', chefId, 'create'],
    mutationFn: ({ rating, comment }) =>
      createReviewAPI(chefId, rating, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', chefId] });
    },
  });
}