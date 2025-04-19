import React, { useState } from 'react';
import { useReviews, useCreateReview } from '../hooks/useReviews';
import { Button } from './ui/button';

export default function ReviewList({ chefId }) {
  const { data: reviews = [], isLoading, isError, error } = useReviews(chefId);
  const createReview = useCreateReview(chefId);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (isLoading) {
    return <p className="py-4 text-center text-gray-500">Loading reviews…</p>;
  }
  if (isError) {
    return <p className="py-4 text-center text-red-600">Error: {error.message}</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview.mutate({ rating, comment }, {
      onSuccess: () => setComment(''),
    });
  };

  return (
    <div className="space-y-6">
      {/* Existing reviews */}
      <ul className="space-y-4">
        {reviews.length === 0 && (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}
        {reviews.map((r) => (
          <li key={r.id} className="border border-gray-200 rounded p-4">
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">
                {'★'.repeat(r.reviewScore)}
                {'☆'.repeat(5 - r.reviewScore)}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                {new Date(r.date).toLocaleDateString()}
              </span>
            </div>
            {r.comment && <p className="text-gray-700">{r.comment}</p>}
          </li>
        ))}
      </ul>

      {/* Submit a new review */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-primary"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <textarea
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-primary resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review…"
          />
        </div>
        <Button type="submit" disabled={createReview.isLoading}>
          {createReview.isLoading ? 'Posting…' : 'Post Review'}
        </Button>
        {createReview.isError && (
          <p className="text-sm text-red-600">
            Error: {createReview.error.message}
          </p>
        )}
      </form>
    </div>
  );
}