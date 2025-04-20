export async function uploadProfileImageAPI(file, userId) {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('userId', userId);
  const res = await fetch('/api/users/profile/upload', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Error uploading image');
  return res.json();
}