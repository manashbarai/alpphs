// Clock.js
import React, { useState, useEffect } from 'react';
import { BsStopwatch } from "react-icons/bs";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    return `${hours % 12 || 12}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div className=" text-3xl font-semibold py-4 flex items-center gap-1 ">
     <BsStopwatch />
     {formatTime(time)}
    </div>
  );
};

export default Clock;
