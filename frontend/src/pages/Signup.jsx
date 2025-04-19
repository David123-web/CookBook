import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await signup({ email, password });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirm"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-primary"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing up…' : 'Sign Up'}
        </Button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}