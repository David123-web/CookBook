import React from 'react';
import { Button } from '../ui/button';

export default function Header({ selectedDate, onChange }) {
  const monthName = selectedDate.format('MMMM');
  const year = selectedDate.format('YYYY');

  const goPrev = () => onChange(selectedDate.clone().subtract(1, 'month'));
  const goNext = () => onChange(selectedDate.clone().add(1, 'month'));
  const isCurrent = selectedDate.isSame(new Date(), 'month');

  return (
    <div className="flex items-center justify-between mb-4">
      <Button
        variant="ghost"
        size="icon"
        disabled={isCurrent}
        onClick={goPrev}
        className={isCurrent ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}
      >
        &laquo;
      </Button>

      <div className="text-lg font-semibold text-gray-800">
        {monthName} {year}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={goNext}
        className="text-gray-600 hover:bg-gray-100"
      >
        &raquo;
      </Button>
    </div>
  );
}