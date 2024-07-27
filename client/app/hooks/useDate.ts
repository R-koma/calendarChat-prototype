"use client";

import { useState } from "react";
import { UseDateReturnType } from "../types/useDate";

const useDate = (): UseDateReturnType => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [view, setView] = useState<string>("month");

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return {
    currentDate,
    setCurrentDate,
    selectedDate,
    handleDateChange,
    view,
    setView,
  };
};

export default useDate;
