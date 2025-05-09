export async function fetchMessagesAPI(chefId) {
    const res = await fetch(`/api/users/${chefId}/profile/message`);
    if (!res.ok) throw new Error('Error fetching messages');
    return res.json();
  }

export async function createMessageAPI(chefId, content, userId) {
  const res = await fetch(`/api/users/${chefId}/profile/message`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: '',                      // or derive one if you like
      content,
      recipientUserId: chefId,        // backend uses this
      date: new Date().toISOString(), // iso timestamp
      isReply: false,                 // or true if replying
      userId,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error sending message');
  }
  const { newMessage } = await res.json();
  return newMessage;
}

export async function deleteMessageAPI(chefId, messageId) {
  const res = await fetch(`/api/users/${chefId}/profile/message/${messageId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting message');
  return res.json();
}
export async function updateMessageAPI(chefId, messageId, updates) {
  const res = await fetch(
    `/api/users/${chefId}/profile/message/${messageId}`,
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