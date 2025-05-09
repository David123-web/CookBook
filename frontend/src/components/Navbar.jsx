import React from 'react';
import { Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';  // adjust path if needed

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <Link to="/" className="text-2xl font-bold text-gray-800">
        CookBook
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/bookings" className="hover:underline text-gray-700">
              My Bookings
            </Link>
            <Link to="/profile" className="hover:underline text-gray-700">
              Profile
            </Link>
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button className="cursor-pointer" variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}