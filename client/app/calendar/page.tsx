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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<string>("month");
  const [menuOpen, setMenuOpen] = useState(false);
  const [friendListOpen, setFriendListOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

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

  const openModal = () => {
    setIsModalOpen(true);
    setMenuOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

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
              className=" bg-gray-800 text-blue-600 text-xxs"
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
        <button
          className="flex items-center ml-1 p-1 text-xxs bg-gray-700 border rounded-full"
          onClick={openModal}
        >
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

  const renderModal = () => {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isModalOpen ? "" : "hidden"}`}
      >
        <div className="bg-gray-800 p-6 rounded shadow-lg w-96 relative">
          <CloseIcon
            className="absolute top-2 right-2 icon-extra-small cursor-pointer"
            onClick={closeModal}
          />
          <h2 className="text-lg text-center mb-4 font-bold">イベント作成</h2>
          <form>
            <div className="mb-2">
              <label className="block text-xxs font-bold">イベント名</label>
              <input
                type="text"
                className="w-full h-5 p-2 border rounded text-gray-700 text-xs outline-none"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xxs font-bold">日付</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                className="w-full h-5 p-2 border rounded text-gray-700 text-xxs outline-none"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xxs font-bold">集合時間</label>
              <input
                type="text"
                className="w-full h-5 p-2 border rounded text-gray-700 text-xs outline-none"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xxs font-bold">集合場所</label>
              <input
                type="text"
                className="w-full h-5 p-2 border rounded text-gray-700 text-xs outline-none"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xxs font-bold">説明</label>
              <textarea className="w-full h-12 p-2 border rounded text-gray-700 text-xxs outline-none"></textarea>
            </div>
            <div className="mb-2">
              <button
                type="button"
                className="flex items-center text-blue-500 text-xxs font-bold"
              >
                <AddIcon className="icon-extra-small" />
                メンバーを招待
              </button>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="flex items-center mr-2 p-2 border-none rounded bg-gray-400 text-xxs h-6"
                onClick={closeModal}
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="flex items-center p-2 border-none rounded bg-blue-500 text-xxs text-white h-6"
              >
                作成
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container bg-white  shadow rounded-lg overflow-hidden relative">
      {renderHeader()}
      {renderMenu()}
      {renderDays()}
      {renderModal()}
    </div>
  );
};

export default Calendar;
