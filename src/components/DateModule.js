// DateDisplay.js
import React from 'react';

const DateDisplay = () => {
  const today = new Date();

  // Format the date as "Day, Month Date, Year" (e.g., "Tuesday, October 24, 2024")
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="text-center text-3xl font-medium py-4  tect-red-600">
      {formattedDate}
    </div>
  );
};

export default DateDisplay;
