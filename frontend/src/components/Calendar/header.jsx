import React from 'react';
import moment from 'moment';
import { Button } from '../ui/button';

export default function Header({ selectedDate, onChange }) {
  // if not a Moment, fall back
  const sel = moment.isMoment(selectedDate) ? selectedDate : moment();
  const monthName = sel.format('MMMM');
  const year = sel.format('YYYY');
  const today = moment();
  const isCurrent = sel.isSame(today, 'month');

  const goPrev = () => onChange(sel.clone().subtract(1, 'month'));
  const goNext = () => onChange(sel.clone().add(1, 'month'));

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={goPrev}
        disabled={isCurrent}
      >
        «
      </Button>
      <div className="text-lg font-semibold text-gray-800">
        {monthName} {year}
      </div>
      <Button variant="ghost" size="icon" onClick={goNext}>
        »
      </Button>
    </div>
  );
}