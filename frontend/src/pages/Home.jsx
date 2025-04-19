import React from 'react';
import { useChefs } from '../hooks/useChefs';
import ChefCard from '../components/ChefCard';

export default function Home() {
  const { data: chefs, isLoading, error } = useChefs();

  if (isLoading) {
    return (
      <p className="text-center py-12 text-gray-500">
        Loading chefs…
      </p>
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
      <h2 className="text-3xl font-bold mb-6">Available Chefs</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {chefs.map((chef) => (
          <ChefCard key={chef.id} chef={chef} />
        ))}
      </div>
    </div>
  );
}