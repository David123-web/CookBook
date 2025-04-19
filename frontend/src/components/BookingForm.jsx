import React, { useState } from 'react';
import { useCreateBooking } from '../hooks/useBookings';
import { useChef } from '../hooks/useChefs';
import Calendar from './Calendar';
import { Button } from './ui/button';

export default function BookingForm({ chefId }) {
  const { data: chef, isLoading: chefLoading } = useChef(chefId);
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    mutate,
    isLoading: isBooking,
    isError,
    error,
    isSuccess,
  } = useCreateBooking();

  if (chefLoading) {
    return (
      <p className="text-center py-4 text-gray-500">
        Loading availability…
      </p>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      mutate({ chefId, date: selectedDate });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Calendar
        selectedDate={selectedDate}
        onChange={setSelectedDate}
        availableDates={chef.availability}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={!selectedDate || isBooking}
      >
        {isBooking ? 'Booking…' : 'Book Chef'}
      </Button>

      {isError && (
        <p className="text-sm text-red-600">
          Error: {error.message}
        </p>
      )}
      {isSuccess && (
        <p className="text-sm text-green-600">
          Booking request sent!
        </p>
      )}
    </form>
  );
}