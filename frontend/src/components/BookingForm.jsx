import React, { useState } from 'react';
import moment from 'moment';
import { useCreateBooking } from '../hooks/useBookings';
import { useChef } from '../hooks/useChefs';
import Calendar from './Calendar';
import { Button } from './ui/button';

export default function BookingForm({ chefId }) {
  const { data: chef, isLoading: chefLoading, isError: chefError, error: chefErrorObj } = useChef(chefId);
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    mutate,
    isLoading: isBooking,
    isError: bookingError,
    error: bookingErrorObj,
    isSuccess,
  } = useCreateBooking();

  if (chefLoading) {
    return <p className="text-center py-4 text-gray-500">Loading availability…</p>;
  }
  if (chefError) {
    return <p className="text-center py-4 text-red-600">Error: {chefErrorObj.message}</p>;
  }

  // Pull ISO dates out of chef.profile.availableDates
  const availDates = (chef.profile?.availableDates || []).map((d) =>
    typeof d === 'string' ? d : d.date
  );

  // Only allow clicks on truly available dates
  const handleDateClick = (day) => {
    const iso = moment.isMoment(day) ? day.format('YYYY-MM-DD') : day;
    if (availDates.includes(iso)) {
      setSelectedDate(moment(iso));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) return;
    mutate(
      { chefId, date: selectedDate.format('YYYY-MM-DD') },
      { onSuccess: () => setSelectedDate(null) }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Calendar
        selectedDate={selectedDate}
        onChange={setSelectedDate}      // for month navigation
        availableDates={availDates}     // only these dates highlighted
        onToggleDate={handleDateClick}  // day click handler
      />

      <Button
        type="submit"
        className="w-full"
        disabled={!selectedDate || isBooking}
      >
        {isBooking ? 'Booking…' : 'Book Chef'}
      </Button>

      {bookingError && (
        <p className="text-sm text-red-600">Error: {bookingErrorObj.message}</p>
      )}
      {isSuccess && (
        <p className="text-sm text-green-600">Booking request sent!</p>
      )}
    </form>
  );
}