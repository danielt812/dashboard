import { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { useSettings } from "../context/SettingsContext";

// Compute timeZone once outside the component
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const Clock = () => {
  const [time, setTime] = useState(new Date());

  // Get settings from context
  const { clockShowSeconds, clock24HourFormat, clockShowMeridiem } = useSettings();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Define format based on user settings
  const timeFormat = clock24HourFormat
    ? `HH:mm${clockShowSeconds ? ":ss" : ""}` // 24-hour format
    : `h:mm${clockShowSeconds ? ":ss" : ""}${clockShowMeridiem ? " a" : ""}`; // 12-hour format

  return (
    <div id="Clock">
      <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold select-none tracking-wide text-bordered">
        {formatInTimeZone(time, timeZone, timeFormat)}
      </div>
    </div>
  );
};

export default Clock;
