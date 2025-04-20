import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button } from '../ui/button';
import Header from './Header';
import Day from './Day';

// Inline buildCalendar for clarity
function buildCalendar(date) {
  const start = date.clone().startOf('month').startOf('week');
  const end = date.clone().endOf('month').endOf('week');
  const d = start.clone().subtract(1, 'day');
  const weeks = [];
  while (d.isBefore(end, 'day')) {
    weeks.push(
      Array(7)
        .fill(0)
        .map(() => d.add(1, 'day').clone())
    );
  }
  return weeks;
}

export default function Calendar({
  selectedDate,
  onChange = () => {},         // default no‑op
  availableDates = [],
  onToggleDate = () => {},     // default no‑op
}) {
  // 1) Local selDate state, initialized once:
  const [selDate, setSelDate] = useState(() =>
    moment.isMoment(selectedDate) ? selectedDate : moment()
  );

  // 2) Sync selDate only when the prop changes:
  useEffect(() => {
    if (moment.isMoment(selectedDate)) {
      setSelDate(selectedDate);
    }
  }, [selectedDate]);

  // 3) Build the calendar when selDate changes:
  const [calendar, setCalendar] = useState(() => buildCalendar(selDate));
  useEffect(() => {
    setCalendar(buildCalendar(selDate));
  }, [selDate]);

  // Helper: convert any ISO/string days into Moment
  const availableMoments = availableDates.map((d) =>
    moment.isMoment(d) ? d : moment(d)
  );

  const goToday = () => {
    const today = moment();
    setSelDate(today);
    onChange(today);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <Header selectedDate={selDate} onChange={(m) => { setSelDate(m); onChange(m); }} />
        <Button variant="outline" size="sm" onClick={goToday}>
          Today
        </Button>
      </div>

      <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
        {['S','M','T','W','T','F','S'].map((d,i) => (
          <div key={i} className="w-10 text-center">{d}</div>
        ))}
      </div>

      <div className="space-y-1">
        {calendar.map((week, wi) => (
          <div key={wi} className="flex justify-between">
            {week.map((day, di) => {
              const isAvail = availableMoments.some((md) =>
                day.isSame(md, 'day')
              );
              const isSel = day.isSame(selDate, 'day');
              return (
                <Day
                  key={di}
                  day={day}
                  isAvailable={isAvail}
                  isSelected={isSel}
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