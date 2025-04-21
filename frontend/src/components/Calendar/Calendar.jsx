import React, { useMemo } from 'react';
import moment from 'moment';
import { Button } from '../ui/button';
import Header from './Header';
import Day from './Day';

/**
 * Build a 2D array of weeks (each week is an array of 7 moment days)
 */
function buildCalendar(date) {
  const start = date.clone().startOf('month').startOf('week');
  const end = date.clone().endOf('month').endOf('week');
  const day = start.clone().subtract(1, 'day');
  const weeks = [];

  while (day.isBefore(end, 'day')) {
    weeks.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    );
  }

  return weeks;
}

export default function Calendar({
  selectedDate,
  onChange,
  availableDates = [],
  onToggleDate,
}) {
  // Ensure we always have a Moment
  const sel = moment.isMoment(selectedDate) ? selectedDate : moment();

  // Build calendar grid when selected month changes
  const calendar = useMemo(() => buildCalendar(sel), [sel]);

  // Parse availableDates (YYYY-MM-DD) into local-midnight Moments
  const availableMoments = useMemo(
    () => availableDates.map((d) => moment(d, 'YYYY-MM-DD')),
    [availableDates]
  );

  const goToday = (e) => {
    e.preventDefault();
    onChange(moment());
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Header + Today */}
      <div className="flex items-center justify-between mb-4">
        <Header
          selectedDate={sel}
          onChange={(m) => onChange(m)}
        />
        <Button type="button" variant="outline" size="sm" onClick={goToday}>
          Today
        </Button>
      </div>

      {/* Weekday labels */}
      <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} className="w-10 text-center">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="space-y-1">
        {calendar.map((week, wi) => (
          <div key={wi} className="flex justify-between">
            {week.map((day, di) => {
              const iso = day.format('YYYY-MM-DD');
              const isAvail = availableMoments.some((md) =>
                md.isSame(day, 'day')
              );
              const isSel = day.isSame(sel, 'day');

              return (
                <Day
                  key={di}
                  day={day}
                  isAvailable={isAvail}
                  isSelected={isSel}
                  onClick={() => onToggleDate(iso)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}