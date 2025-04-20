import React, { useState } from 'react';
import moment from 'moment';
import Calendar from './Calendar';
import { useAddAvailability, useRemoveAvailability } from '../hooks/useAvailability';
import { Button } from './ui/button';

export default function AvailabilityManager({ initialDates, refreshUser }) {
  const [selectedDate, setSelectedDate] = useState(() => moment());
  const addAvail = useAddAvailability();
  const removeAvail = useRemoveAvailability();

  // ✂ Strip off the time so we only have date‐only strings:
  const dateOnly = initialDates.map((d) =>
    typeof d === 'string' ? d.split('T')[0] : moment(d).format('YYYY-MM-DD')
  );

  const handleToggle = (date) => {
    const dateStr = typeof date === 'string' ? date : date.format('YYYY-MM-DD');
    const isAvail = dateOnly.includes(dateStr);
    const action = isAvail ? removeAvail : addAvail;

    action.mutate(
      { date: dateStr },
      { onSuccess: () => {
          refreshUser();
          setSelectedDate(moment(dateStr));
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded space-y-4">
      <h3 className="text-lg font-semibold">Manage Availability</h3>

      <Calendar
        selectedDate={selectedDate}
        onChange={setSelectedDate}
        availableDates={dateOnly}      // ← pass in the date‐only array
        onToggleDate={handleToggle}
      />

      {selectedDate && (
        <Button
          className="w-full"
          onClick={() => handleToggle(selectedDate)}
          disabled={addAvail.isLoading || removeAvail.isLoading}
        >
          {initialDates.includes(selectedDate.format('YYYY-MM-DD'))
            ? 'Remove Date'
            : 'Add Date'}
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