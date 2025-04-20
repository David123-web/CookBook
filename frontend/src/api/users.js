export async function updateProfileAPI(profileData) {
  const res = await fetch('/api/users/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(profileData),
  });
  if (!res.ok) throw new Error('Error updating profile');
  return res.json();
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