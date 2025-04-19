import React from 'react';
import OriginalCalendar from './Calendar/Calendar.jsx';

export default function Calendar({ selected, onSelect, availability = [] }) {
  // Pass props to the original calendar implementation
  return (
    <OriginalCalendar
      selectedDate={selected}
      onChange={onSelect}
      availableDates={availability}
    />
  );
}