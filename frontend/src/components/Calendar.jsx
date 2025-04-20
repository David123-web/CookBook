import React from 'react';
import moment from 'moment';
import OriginalCalendar from './Calendar/Calendar.jsx';

export default function Calendar({
  selectedDate,
  onChange,
  availableDates = [],
  onToggleDate,
}) {
  // Normalize everything to "YYYY-MM-DD"
  const dateOnlyStrings = availableDates.map((d) => {
    if (typeof d === 'string') {
      // drop any time component if present
      return d.split('T')[0];
    }
    // for Date objects or Moments
    return moment(d).format('YYYY-MM-DD');
  });

  return (
    <OriginalCalendar
      selectedDate={selectedDate}
      onChange={onChange}
      availableDates={dateOnlyStrings}
      onToggleDate={onToggleDate}
    />
  );
}