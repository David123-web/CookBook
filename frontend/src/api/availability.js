export async function addAvailabilityAPI(profileId, date) {
  // Convert to a full ISO‑8601 timestamp
  const fullDate = new Date(date).toISOString();

  const res = await fetch('/api/users/profile/availability', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profileId,
      availableDate: fullDate,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error adding availability');
  }

  return res.json();
}

export async function removeAvailabilityAPI(profileId, date) {
  const fullDate = new Date(date).toISOString();

  const res = await fetch('/api/users/profile/availability', {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profileId,
      availableDate: fullDate,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error removing availability');
  }

  return res.json();
}