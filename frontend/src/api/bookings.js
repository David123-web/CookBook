// Fetch bookings for the current user and userType
export async function fetchBookingsAPI(userId, userType) {
  const res = await fetch(`/api/bookings/${userId}/${userType}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error fetching bookings');
  return res.json();
}

// Create a booking (old app used PUT)
export async function createBookingAPI(data) {
  const res = await fetch('/api/bookings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error creating booking');
  return res.json();
}

// Cancel (delete) a booking by id
export async function deleteBookingAPI(id) {
  const res = await fetch(`/api/bookings/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error deleting booking');
  return res.json();
}