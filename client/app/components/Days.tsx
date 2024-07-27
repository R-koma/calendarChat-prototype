import {
  getMonthNames,
  getMonthStartEnd,
  getPrevMonthEndDate,
  getWeekdays,
} from "../utils/dateUtils";

type DaysProps = {
  currentDate: Date;
};

const Days: React.FC<DaysProps> = ({ currentDate }) => {
  const days = [];
  const weekdays = getWeekdays();
  const monthNames = getMonthNames();
  const { startDate, endDate } = getMonthStartEnd(currentDate);

  const weekdayElements = weekdays.map((day, index) => (
    <div
      key={`weekday-${index}`}
      className="p-0 border border-gray-200 text-xs text-gray-400 text-center date-cell"
    >
      {day}
    </div>
  ));

  const prevMonthEndDate = getPrevMonthEndDate(currentDate);
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
        {d === 1 ? `${monthNames[currentDate.getMonth()]} ${d}` : d}
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
          ? `${monthNames[(currentDate.getMonth() + 1) % 12]} ${nextMonthDay}`
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

export default Days;
