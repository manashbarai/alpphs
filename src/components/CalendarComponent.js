// CalendarComponent.jsx
import React, { useState, useEffect } from 'react';

const CalendarComponent = () => {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [day, setDay] = useState("All"); // Set default to "All"
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [showDayOptions, setShowDayOptions] = useState(false);

    const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

    useEffect(() => {
        setDaysInMonth(Array.from({ length: getDaysInMonth(month, year) }, (_, i) => i + 1));
    }, [month, year]);

    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value, 10);
        setYear(newYear);
    };

    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value, 10);
        setMonth(newMonth);
    };

    const handleDayChange = (selectedDay) => {
        setDay(selectedDay);
        setShowDayOptions(false);
    };

    const toggleDayOptions = () => {
        setShowDayOptions(!showDayOptions);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
                <div className="relative">
                    <label className="block text-gray-700 font-semibold">Day</label>
                    <button
                        onClick={toggleDayOptions}
                        className="border rounded p-2 bg-white text-gray-700 relative"
                    >
                        {day === 'All' ? 'All Days' : `Day ${day}`}
                </button>
                    {showDayOptions && (
                        <div className="absolute left-0 mt-2 grid grid-cols-5 gap-2 w-[300px] bg-white border border-gray-300 p-2 rounded shadow-lg z-10">
                            <button
                                onClick={() => handleDayChange('All')}
                                className={`p-2 rounded ${day === 'All' ? 'text-red-600' : 'text-gray-600'}`}
                            >
                                All
                            </button>
                            {daysInMonth.map((dayOption) => (
                                <button
                                    onClick={() => handleDayChange(dayOption)}
                                    key={dayOption}
                                    className={`p-2 rounded ${day === dayOption ? 'text-red-600' : 'text-gray-600'}`}
                                >
                                    {dayOption}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">Month</label>
                    <select
                        value={month}
                        onChange={handleMonthChange}
                        className="border rounded p-2"
                    >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                            <option key={m} value={m}>
                                {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">Year</label>
                    <input
                        type="number"
                        value={year}
                        onChange={handleYearChange}
                        className="border rounded p-2"
                        min="1900"
                        max="2100"
                    />
                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;
