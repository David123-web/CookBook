import React from 'react';
import { useParams } from 'react-router-dom';
import { useChef } from '../hooks/useChefs';
import BookingForm from '../components/BookingForm';
import MessageBox from '../components/MessageBox';
import ReviewList from '../components/ReviewList';

export default function ChefDetail() {
  const { id } = useParams();
  const { data: chef, isLoading, isError, error } = useChef(id);

  if (isLoading) {
    return (
      <p className="text-center py-12 text-gray-500">
        Loading chef…
      </p>
    );
  }
  if (isError) {
    return (
      <p className="text-center py-12 text-red-600">
        Error: {error.message}
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Profile header & booking */}
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <img
          src={chef.avatar}
          alt={chef.name}
          className="w-full lg:w-1/3 h-auto rounded-lg object-cover"
        />

        <div className="mt-6 lg:mt-0 flex-1">
          <h1 className="text-3xl font-bold text-gray-800">
            {chef.name}
          </h1>
          <p className="mt-2 text-gray-600">
            Specialty: {chef.specialty}
          </p>
          <p className="mt-4 text-gray-700">{chef.bio}</p>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Book this Chef
            </h2>
            <BookingForm chefId={chef.id} />
          </div>
        </div>
      </div>

      {/* Messaging & Reviews */}
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Messages
          </h2>
          <MessageBox chefId={chef.id} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Reviews
          </h2>
          <ReviewList chefId={chef.id} />
        </section>
      </div>
    </div>
  );
}