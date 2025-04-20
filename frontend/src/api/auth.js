export async function signupAPI({
    firstName,
    lastName,
    userType,
    email,
    password,
    postalCode,
    dateOfBirth,
    businessName,
    address,
    city,
  }) {
    const res = await fetch('/api/signup', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        userType,
        email,
        password,
        postalCode,
        dateOfBirth,   // assume YYYY-MM-DD string
        businessName,
        address,
        city,
      }),
    });
  
    if (!res.ok) {
      const { message } = await res.json().catch(() => ({}));
      throw new Error(message || 'Signup failed');
    }
    return res.json(); // { token, ...newUser }
  }

export async function loginAPI({ email, password }) {
const res = await fetch('/api/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
});
if (!res.ok) {
    const { message } = await res.json().catch(() => ({}));
    throw new Error(message || 'Login failed');
}
return res.json(); // your user object
}