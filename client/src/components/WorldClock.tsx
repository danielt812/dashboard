import { useState, useEffect } from "react";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { differenceInHours } from "date-fns";
import { useSettings } from "../context/SettingsContext";

// Get browser's timezone
const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const formatDate = (timeZone: string, format: string, date: Date) => {
  return formatInTimeZone(date, timeZone, format);
};

const getHourDifference = (timeZone: string, date: Date) => {
  const browserTime = toZonedTime(date, browserTimeZone);
  const targetTime = toZonedTime(date, timeZone);
  return differenceInHours(targetTime, browserTime);
};

const WorldClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Get settings from context
  const { worldClockShowDate, worldClock24HourFormat, worldClockShowMeridiem, selectedTimezones } = useSettings();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Define time format based on settings
  const timeFormat = worldClock24HourFormat
    ? `${worldClockShowDate ? "MM/dd " : ""} HH:mm` // 24-hour format
    : `${worldClockShowDate ? "MM/dd " : ""} hh:mm${worldClockShowMeridiem ? " a" : ""}`; // 12-hour format

  return (
    <>
      {selectedTimezones.length === 0 && (
        <div className='text-xl sm:text-2xl md:text-4xl lg:text-6xl text-center select-none text-bordered'>Select up to 5 world clocks in Settings</div>
      )}
      {selectedTimezones.length > 0 && (
        <table className='border-2 border-collapse border-black border-solid bg-transparent select-none'>
          <thead>
            <tr className='text-xl'>
              <th className='p-4 border-2'>Zone</th>
              <th className='p-4 border-2'>Time</th>
              <th className='p-4 border-2'>Diff</th>
            </tr>
          </thead>
          <tbody>
            {selectedTimezones.map((timeZone: string) => (
              <tr
                className='text-lg'
                key={timeZone}
              >
                <td className='p-2 border-2 text-center text-2xl'>{formatDate(timeZone, "zzz", currentTime)}</td>
                <td className='p-2 border-2 text-center text-2xl'>{formatDate(timeZone, timeFormat, currentTime)}</td>
                <td className='p-2 border-2 text-center text-2xl'>{getHourDifference(timeZone, currentTime)} hours</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default WorldClock;
