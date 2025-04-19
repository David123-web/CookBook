export async function addAvailabilityAPI(profileId, date) {
    const res = await fetch('/users/profile/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', profileId, availableDate: date },
    });
    if (!res.ok) throw new Error('Error adding availability');
    return res.json();
  }
  
export async function removeAvailabilityAPI(profileId, date) {
  const res = await fetch('/users/profile/availability', {
    method: 'DELETE',
    headers: { profileId, availableDate: date },
  });
  if (!res.ok) throw new Error('Error removing availability');
  return res.json();
}