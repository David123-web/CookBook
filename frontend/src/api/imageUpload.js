export async function uploadProfileImageAPI(file) {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch('/users/profile/upload', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Error uploading image');
  return res.json();
}