"use client";

import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center w-full h-10 bg-gray-800 px-4">
        <div className="flex items-center">
          <div className="mr-4 cursor-pointer">&#9776;</div>
          <div className="font-bold cursor-pointer">CC</div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="flex justify-center items-center mx-2 px-2 py-1 border border-gray-500 rounded">
            <button
              onClick={() => setCurrentDate(new Date())}
              className="text-blue-600 text-xxs font-normal"
            >
              Today
            </button>
          </div>
          <div
            className="mx-2 cursor-pointer"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() - 1))
              )
            }
          >
            &#8249;
          </div>
          <div className="cursor-pointer font-medium mx-2 text-xs">
            {currentDate.toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
            })}
          </div>
          <div
            className="mx-2 cursor-pointer"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() + 1))
              )
            }
          >
            &#8250;
          </div>
        </div>
        <div className="flex items-center justify-end text-xs">
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="mr-4 text-xxs text-white cursor-pointer bg-gray-800 border border-gray-500 rounded px-2 py-1 outline-none"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <div className="cursor-pointer border border-gray-500 rounded-full px-2 py-1">
            R
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = currentDate.getMonth();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const weekdayElements = weekdays.map((day, index) => (
      <div
        key={`weekday-${index}`}
        className="p-0 border border-gray-200 text-xs text-gray-400 text-center date-cell"
      >
        {day}
      </div>
    ));

    // const weekdayElements = [];
    // for (let index = 0; index < weekdays.length; index++) {
    //   const day = weekdays[index];
    //   weekdayElements.push(
    //     <div
    //       key={`weekday-${index}`}
    //       className="p-0 border border-gray-200 text-xs text-gray-400 text-center"
    //     >
    //       {day}
    //     </div>
    //   );
    // }

    const prevMonthEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    const prevMonthDays = startDate.getDay();

    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-month-day-${prevMonthEndDate.getDate() - i}`}
          className="p-4 border border-gray-200  text-gray-400 date-cell"
        >
          {prevMonthEndDate.getDate() - i}
        </div>
      );
    }

    for (let d = 1; d <= endDate.getDate(); d++) {
      days.push(
        <div
          key={`day-${d}`}
          className="p-4 border border-gray-200 text-xs text-gray-900 date-cell"
        >
          {d === 1 ? `${monthNames[currentMonth]} ${d}` : d}
        </div>
      );
    }

    const totalDays = prevMonthDays + endDate.getDate();

    const nextMonthDays = (7 - (totalDays % 7)) % 7;
    for (let nextMonthDay = 1; nextMonthDay <= nextMonthDays; nextMonthDay++) {
      days.push(
        <div
          key={`next-month-day-${nextMonthDay}`}
          className="p-4 border border-gray-200 text-xs text-gray-400 date-cell"
        >
          {nextMonthDay === 1
            ? `${monthNames[(currentMonth + 1) % 12]} ${nextMonthDay}`
            : nextMonthDay}
        </div>
      );
    }

    return (
      <div className="calendar-content">
        <div className="text-gray-800 pt-0 w-full">
          <div className="h-full">
            <div className="grid grid-cols-7">{weekdayElements}</div>
            <div className="grid grid-cols-7 h-full">{days}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container bg-white  shadow rounded-lg overflow-hidden">
      {renderHeader()}
      {renderDays()}
    </div>
  );
};

export default Calendar;
