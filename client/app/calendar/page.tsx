"use client";

import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <div className="flex items-center">
          <div className="mr-4 cursor-pointer">&#9776;</div>
          <div className="font-bold">アプリ名</div>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setCurrentDate(new Date())}
            className="mr-4 text-blue-600"
          >
            今日
          </button>
          <div className="font-semibold">
            {currentDate.toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
            })}
          </div>
          <div className="flex items-center ml-4">
            <div className="mr-2 cursor-pointer">&#8249;</div>
            <div className="mr-2 cursor-pointer">&#8250;</div>
          </div>
          <div className="ml-4 cursor-pointer">Month</div>
          <div className="ml-4 cursor-pointer">R</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
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

    for (let i = 1; i < startDate.getDay(); i++) {
      days.push(
        <div
          key={`empty-start-${i}`}
          className="p-4 border border-gray-200"
        ></div>
      );
    }

    for (let d = 1; d <= endDate.getDate(); d++) {
      days.push(
        <div key={`day-${d}`} className="p-4 border border-gray-200">
          {d}
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <div className="grid grid-cols-7 gap-1 text-center pt-0">{days}</div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {renderHeader()}
      {renderDays()}
    </div>
  );
};

export default Calendar;
