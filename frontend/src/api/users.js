export async function updateProfileAPI({ userId, profileId, city, yearsOfExperience, hourlyRate, position, description }) {
  const res = await fetch('api/users/profile', {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      profileId,
      city,
      yearsOfExperience,
      hourlyRate,
      position,
      description,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Update failed');
  }
  return res.json(); // { updatedUser, updatedProfile }
}

// Fetch all tags (for the tag picker)
export async function fetchTagsAPI() {
  const res = await fetch('/api/tags', {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error fetching tags');
  return res.json();
}

// Add a tag to the user’s profile
export async function addUserTagAPI(tagName, profileId) {
  const res = await fetch('/api/tags/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ tagName, profileId }),
  });
  if (!res.ok) throw new Error('Error adding tag');
  return res.json();
}

// Remove a tag from the user’s profile
export async function removeUserTagAPI(userTagId, userId) {
  // Old app used headers for DELETE
  const res = await fetch('/api/tags/user', {
    method: 'DELETE',
    headers: {
      userTagId,
      userId,
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error removing tag');
  return res.json();
}