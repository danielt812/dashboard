import { useState, useEffect } from "react";

import fetchHolidaysByCountryCode from "../utils/fetchHolidaysByCountryCode";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [publicHolidays, setPublicHolidays] = useState<any[]>([]);

  // Get first day & number of days in the month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday, 6 = Saturday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const onDateSelect = (date: string) => {
    console.log("Selected date:", date);
  };

  useEffect(() => {
    const fetchWidgetData = async () => {
      try {
        const holidays = await fetchHolidaysByCountryCode(year.toString(), "US");
        const publicHolidaysFilter = holidays
          .filter((holiday: any) => holiday.types.includes("Public"))
          .map((holiday: any) => {
            return { date: holiday.date, name: holiday.name };
          });

        setPublicHolidays([...publicHolidaysFilter]);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchWidgetData();
  }, []);

  // Navigate to previous or next month
  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  // Check if a day is today
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const isPublicHoliday = (dateString: string) => {
    const holiday = publicHolidays.find((holiday) => {
      return holiday.date === dateString;
    });
    return holiday;
  };

  return (
    <div className='p-4 bg-transparent shadow-lg rounded-xl'>
      {/* Header */}
      <div className='flex justify-between items-center mb-2'>
        <button
          onClick={() => changeMonth(-1)}
          className='text-white hover:cursor-pointer'
        >
          ◀
        </button>
        <h2 className='text-lg font-semibold'>
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className='text-white hover:cursor-pointer'
        >
          ▶
        </button>
      </div>

      {/* Week Days */}
      <div className='grid grid-cols-7 text-center text-xs font-semibold text-white'>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className='py-1'
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className='grid grid-cols-7 text-center'>
        {/* Empty slots for first week */}
        {Array.from({ length: firstDay }, (_, i) => (
          <div
            key={`empty-${i}`}
            className='py-2'
          ></div>
        ))}

        {/* Calendar Days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          return (
            <button
              key={day}
              onClick={() => onDateSelect?.(dateString)}
              className={`w-8 h-8 rounded-full hover:cursor-pointer ${isToday(day) && "bg-blue-500"}
                } ${isPublicHoliday(dateString) && "bg-red-500"}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
