import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import { useAddAvailability, useRemoveAvailability } from '../hooks/useAvailability';
import { Button } from './ui/button';

export default function AvailabilityManager({ initialDates }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const addAvail = useAddAvailability();
  const removeAvail = useRemoveAvailability();

  const handleToggle = (date) => {
    const isAvail = initialDates.includes(date);
    const action = isAvail ? removeAvail : addAvail;
    action.mutate({ date });
  };

  // If the outside `initialDates` changes (e.g. after a mutation), clear any stale selection
  useEffect(() => {
    if (selectedDate && !initialDates.includes(selectedDate)) {
      setSelectedDate(null);
    }
  }, [initialDates, selectedDate]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded space-y-4">
      <h3 className="text-lg font-semibold">Manage Availability</h3>

      <Calendar
        selectedDate={selectedDate}
        onChange={setSelectedDate}
        availableDates={initialDates}
        onToggleDate={handleToggle}
      />

      {selectedDate && (
        <Button
          className="w-full"
          onClick={() => handleToggle(selectedDate)}
          disabled={addAvail.isLoading || removeAvail.isLoading}
        >
          {initialDates.includes(selectedDate) ? 'Remove Date' : 'Add Date'}
        </Button>
      )}

      {(addAvail.error || removeAvail.error) && (
        <p className="text-sm text-red-600">
          Error: {(addAvail.error || removeAvail.error).message}
        </p>
      )}
    </div>
  );
}