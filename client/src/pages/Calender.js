import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 2)); // August 2025

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isPrevMonth: true
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isPrevMonth: false
      });
    }

    // Next month days
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isPrevMonth: false
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with pie chart and fee status */}
      <div className="flex">
        {/* Left side with pie chart */}
        <div className="bg-teal-400 p-4 flex items-center justify-center">
          <div className="relative w-16 h-16">
            {/* Pie chart segments */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="w-full h-full relative">
                {/* Red segment */}
                <div 
                  className="absolute inset-0 bg-red-500"
                  style={{
                    clipPath: 'polygon(50% 50%, 50% 0%, 85% 15%, 50% 50%)'
                  }}
                ></div>
                {/* Orange segment */}
                <div 
                  className="absolute inset-0 bg-orange-400"
                  style={{
                    clipPath: 'polygon(50% 50%, 85% 15%, 100% 50%, 50% 50%)'
                  }}
                ></div>
                {/* Yellow segment */}
                <div 
                  className="absolute inset-0 bg-yellow-400"
                  style={{
                    clipPath: 'polygon(50% 50%, 100% 50%, 85% 85%, 50% 50%)'
                  }}
                ></div>
                {/* Green segment */}
                <div 
                  className="absolute inset-0 bg-green-500"
                  style={{
                    clipPath: 'polygon(50% 50%, 85% 85%, 50% 100%, 15% 85%, 50% 50%)'
                  }}
                ></div>
                {/* Blue segment */}
                <div 
                  className="absolute inset-0 bg-blue-500"
                  style={{
                    clipPath: 'polygon(50% 50%, 15% 85%, 0% 50%, 15% 15%, 50% 50%)'
                  }}
                ></div>
                {/* Purple segment */}
                <div 
                  className="absolute inset-0 bg-purple-500"
                  style={{
                    clipPath: 'polygon(50% 50%, 15% 15%, 50% 0%, 50% 50%)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side with fee status */}
        <div className="bg-pink-400 flex-1 p-4 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">No Fee Due</span>
        </div>
      </div>

      {/* Calendar header */}
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {currentMonth} {currentYear}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((dateObj, index) => (
            <button
              key={index}
              className={`
                h-8 w-8 text-sm rounded flex items-center justify-center transition-colors
                ${dateObj.isCurrentMonth 
                  ? 'text-gray-900 hover:bg-blue-100' 
                  : 'text-gray-400'
                }
                ${dateObj.day === 2 && dateObj.isCurrentMonth 
                  ? 'bg-blue-500 text-white' 
                  : ''
                }
              `}
            >
              {dateObj.day}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              <Calendar className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm font-medium text-gray-700">
            July 31, 2025
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">My Classes</h3>
          <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center text-gray-500">
            <span>No classes scheduled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;