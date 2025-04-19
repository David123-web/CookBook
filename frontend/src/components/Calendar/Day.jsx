import React from 'react';

export default function Day({ day, isAvailable, isSelected, onClick }) {
  return (
    <div
      onClick={() => onClick(day)}
      title="Toggle availability"
      className={`
        flex items-center justify-center 
        h-10 w-10 
        cursor-pointer select-none 
        rounded 
        transition-shadow 
        ${isAvailable ? 'bg-green-100' : 'bg-white'}
        ${isSelected ? 'border-2 border-primary' : 'border border-gray-200'}
        hover:shadow
      `}
    >
      <span
        className={`text-sm ${
          isSelected ? 'font-semibold text-primary' : 'text-gray-700'
        }`}
      >
        {day.format('D')}
      </span>
    </div>
  );
}