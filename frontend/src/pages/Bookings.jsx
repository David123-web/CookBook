import React from 'react';
import { useBookings, useDeleteBooking } from '../hooks/useBookings';
import { useAuth } from '../context/AuthContext';
import moment from 'moment';

export default function Bookings() {
  const { user } = useAuth();
  const { data: bookings = [], isLoading, error } = useBookings();
  const deleteBooking = useDeleteBooking();

  if (isLoading) {
    return (
      <p className="text-center py-12 text-gray-500">Loading bookings…</p>
    );
  }
  if (error) {
    return (
      <p className="text-center py-12 text-red-500">
        Error: {error.message}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Received
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {user.userType === 'Chef' ? 'Booker' : 'Chef Booked'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {moment(b.date).format('YYYY-MM-DD')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {moment(b.createdAt).format('YYYY-MM-DD')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {`${b.user.firstName} ${b.user.lastName}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {b.user.businessName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {b.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                        b.accepted
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {b.accepted ? 'Accepted' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => deleteBooking.mutate(b.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}