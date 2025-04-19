import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Header from './Header';   // Tailwind‐styled header with shadcn Button
import Day from './Day';         // Tailwind‐styled Day component


function buildCalendar(selectedDate) {
  const startDay = selectedDate.clone().startOf("month").startOf("week");
  const endDay = selectedDate.clone().endOf("month").endOf("week");
  const day = startDay.clone().subtract(1, "day");
  const calendar = [];
  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  return calendar;
}

export default function Calendar({
  selectedDate,
  onChange,
  availableDates = [],
  onToggleDate,
}) {
  const [calendar, setCalendar] = useState([]);

  // convert ISO strings to moments
  const availableMoments = availableDates.map((d) => moment(d));

  useEffect(() => {
    setCalendar(buildCalendar(selectedDate));
  }, [selectedDate]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Header selectedDate={selectedDate} onChange={onChange} />

      {/* Day names */}
      <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="w-10 text-center">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="space-y-1">
        {calendar.map((week, wi) => (
          <div key={wi} className="flex justify-between">
            {week.map((day, di) => {
              const isAvailable = availableMoments.some((ad) =>
                day.isSame(ad, 'day')
              );
              const isSelected = day.isSame(selectedDate, 'day');

              return (
                <Day
                  key={di}
                  day={day}
                  isAvailable={isAvailable}
                  isSelected={isSelected}
                  onClick={() => onToggleDate(day.format('YYYY-MM-DD'))}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}