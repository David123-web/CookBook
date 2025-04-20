export async function fetchChefsAPI() {
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error('Error fetching chefs');
    return res.json();
  }
  
export async function fetchChefByIdAPI(id) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error('Error fetching chef');
  return res.json();
}