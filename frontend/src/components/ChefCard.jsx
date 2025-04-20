import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function ChefCard({ chef }) {
  const {
    id,
    firstName,
    lastName,
    specialty,
    city,
    profile = {},    // nested profile, if present
    tags = [],
    reviews = [],
  } = chef;

  // Prefer top‑level avatar, then nested profile.imgUrl, then a default
  const avatarUrl = profile.imgUrl

  // Compute average review score
  const total = reviews.reduce((sum, r) => sum + (r.reviewScore || 0), 0);
  const avg = reviews.length ? total / reviews.length : null;
  const rounded = avg ? Math.round(avg) : 0;

  return (
    <div className="w-64 bg-white shadow rounded-lg overflow-hidden m-4 flex flex-col">
      <Link to={`/chef/${id}`} className="block">
        <img
          src={avatarUrl}
          alt={`${firstName} ${lastName} avatar`}
          className="h-40 w-full object-cover hover:scale-105 transition-transform"
        />
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">
          {firstName} {lastName}
        </h3>
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

        {avg !== null ? (
          <div className="mt-2 flex items-center">
            <div className="text-yellow-500">
              {'★'.repeat(rounded)}
              {'☆'.repeat(5 - rounded)}
            </div>
            <span className="ml-2 text-gray-600 text-sm">
              {avg.toFixed(1)} / 5
            </span>
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-500">No reviews yet</p>
        )}

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map((t) => (
              <span
                key={t}
                className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 pt-0">
        <Link to={`/chef/${id}`}>
          <Button className="w-full" variant="primary">
            View &amp; Book
          </Button>
        </Link>
      </div>
    </div>
  );
}