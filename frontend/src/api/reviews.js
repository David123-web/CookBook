export async function fetchReviewsAPI(chefId) {
  const res = await fetch(`/api/users/${chefId}/profile/reviews`);
  if (!res.ok) throw new Error('Error fetching reviews');
  return res.json();
}
export async function createReviewAPI(chefId, rating, comment, userId) {
  const res = await fetch(`/api/users/${chefId}/profile/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewScore: rating, content: comment , userId }),
  });
  if (!res.ok) throw new Error('Error creating review');
  return res.json();
}