"use client";

import React, { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<string>("month");
  const [menuOpen, setMenuOpen] = useState(false);
  const [friendListOpen, setFriendListOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleFriendList = () => {
    setFriendListOpen(!friendListOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center w-full h-10 bg-gray-800 px-4">
        <div className="flex items-center">
          <MenuIcon
            fontSize="small"
            className="mr-4 cursor-pointer"
            onClick={toggleMenu}
          />
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
          <ArrowBackIosIcon
            className="mx-2 cursor-pointer icon-extra-small"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() - 1))
              )
            }
          />
          <div className="cursor-pointer font-medium mx-2 text-xs">
            {currentDate.toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
            })}
          </div>

          <ArrowForwardIosIcon
            className="mx-2 cursor-pointer icon-extra-small"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() + 1))
              )
            }
          />
        </div>
        <div className="flex items-center justify-end text-xs">
          <SearchIcon fontSize="small" className="mr-4 cursor-pointer" />
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

  const renderMenu = () => {
    return (
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-56 h-full bg-gray-800 text-white transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center p-2">
          <CloseIcon
            fontSize="small"
            className="mr-4 cursor-pointer"
            onClick={toggleMenu}
          />
          <div className="font-bold cursor-pointer">CC</div>
        </div>
        <button className="flex items-center ml-1 p-1 text-xxs bg-gray-700 border rounded-full">
          <AddIcon className="icon-extra-small" />
          イベント作成
        </button>
        <div>
          <div
            className="flex items-center px-2 pt-2 cursor-pointer"
            onClick={toggleFriendList}
          >
            <div className="text-xxs mr-2">友達リスト</div>
            {friendListOpen ? (
              <ArrowDropUpIcon
                onClick={toggleFriendList}
                fontSize="small"
                className="cursor-pointer"
              />
            ) : (
              <ArrowDropDownIcon
                onClick={toggleFriendList}
                fontSize="small"
                className="cursor-pointer"
              />
            )}
          </div>
          {friendListOpen && (
            <div className="px-2">
              <div className="flex items-center p-1">
                <input
                  type="text"
                  className="flex-grow p-1 bg-gray-700 rounded-sm text-xxs h-4"
                  placeholder="名前を検索"
                />
              </div>
              <label className="flex items-center p-1 w-full cursor-pointer">
                <div className="text-xxs w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full mr-2">
                  T
                </div>
                <div className="text-xxs">タナカ</div>
              </label>
              <label className="flex items-center p-1 w-full cursor-pointer">
                <div className="cursor-pointer text-xxs w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full mr-2">
                  M
                </div>
                <div className="text-xxs">マイケル</div>
              </label>
              <label className="flex items-center p-1 w-full cursor-pointer">
                <div className="cursor-pointer text-xxs w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full mr-2">
                  J
                </div>
                <div className="text-xxs">ジョン</div>
              </label>
              <label className="flex items-center p-1 w-full cursor-pointer">
                <div className="cursor-pointer text-xxs w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full mr-2">
                  N
                </div>
                <div className="text-xxs">ニーナ</div>
              </label>
            </div>
          )}
        </div>

        <label className="flex items-center p-2 cursor-pointer">
          <AddIcon className="icon-extra-small" />
          <div className="text-xxxs">友達を追加</div>
        </label>
        <div className="flex items-center p-2 absolute bottom-0 w-full">
          <div className="cursor-pointer text-xxs w-auto border border-gray-500 rounded-full mr-1 px-2 py-1">
            R
          </div>
          <div className="text-xxs">リョウタ</div>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container bg-white  shadow rounded-lg overflow-hidden">
      {renderHeader()}
      {renderMenu()}
      {renderDays()}
    </div>
  );
};

export default Calendar;
