export async function fetchMessagesAPI(chefId) {
    const res = await fetch(`/users/${chefId}/profile/message`);
    if (!res.ok) throw new Error('Error fetching messages');
    return res.json();
  }
export async function createMessageAPI(chefId, content) {
  const res = await fetch(`/users/${chefId}/profile/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('Error sending message');
  return res.json();
}
export async function deleteMessageAPI(chefId, messageId) {
  const res = await fetch(`/users/${chefId}/profile/message/${messageId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting message');
  return res.json();
}
export async function updateMessageAPI(chefId, messageId, updates) {
  const res = await fetch(
    `/users/${chefId}/profile/message/${messageId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updates),
    }
  );
  if (!res.ok) throw new Error('Error updating message');
  return res.json();
}