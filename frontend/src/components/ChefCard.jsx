import React from 'react';
import { Link } from 'react-router-dom';

export default function ChefCard({ chef }) {
  const { id, name, specialty, city, avatar, tags = [], reviews = [] } = chef;
  const total = reviews.reduce((sum, r) => sum + r.reviewScore, 0);
  const avg = reviews.length ? (total / reviews.length).toFixed(1) : null;

  return (
    <div className="w-64 bg-white shadow rounded-lg overflow-hidden m-4 flex flex-col">
      <Link to={`/users/${id}/profile`} className="block">
        <img
          src={avatar}
          alt={`${name} avatar`}
          className="h-40 w-full object-cover hover:scale-105 transition-transform"
        />
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">{specialty}</p>
        <p className="text-sm text-gray-600 mt-1 flex items-center">
          <svg
            className="h-4 w-4 mr-1 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a6 6 0 00-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 00-6-6z" />
            <circle cx="10" cy="8" r="2" fill="white" />
          </svg>
          {city}
        </p>

        {avg ? (
          <div className="mt-2 text-yellow-500">
            {'★'.repeat(Math.round(avg))}
            {'☆'.repeat(5 - Math.round(avg))}
            <span className="ml-2 text-gray-600 text-sm">{avg} / 5</span>
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-500">No reviews yet</p>
        )}

        <div className="mt-3 flex flex-wrap gap-1">
          {tags.map(t => (
            <span
              key={t}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link
          to={`/users/${id}/profile`}
          className="block text-center bg-primary text-white py-2 rounded hover:bg-primary-dark"
        >
          View & Book
        </Link>
      </div>
    </div>
  );
}