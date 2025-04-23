import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Clock from "../components/Clock";
import WorldClock from "../components/WorldClock";
import Calendar from "../components/Calendar";
import Quote from "../components/Quote";

// Svg Icons
import ClockSvg from "../svgs/misc/Clock";
import WorldSvg from "../svgs/misc/World";
import CalendarSvg from "../svgs/misc/Calendar";

const CenterContainer = () => {
  const [svgSize, setSvgSize] = useState(86);
  const [mode, setMode] = useState("clock");

  useEffect(() => {
    const handleSvgResize = () => {
      if (window.innerWidth < 640) {
        // sm breakpoint
        setSvgSize(48);
      } else if (window.innerWidth < 768) {
        // md breakpoint
        setSvgSize(48);
      } else if (window.innerWidth < 1024) {
        // lg breakpoint
        setSvgSize(86);
      } else {
        // xl breakpoint
        setSvgSize(96);
      }
    };

    handleSvgResize();
    window.addEventListener("resize", handleSvgResize);
    return () => window.removeEventListener("resize", handleSvgResize);
  }, []);

  return (
    <div className='flex flex-col justify-center items-center gap-4 h-full'>
      {mode === "clock" ? <Clock /> : null}
      {mode === "worldClock" ? <WorldClock /> : null}
      {mode === "calendar" ? <Calendar /> : null}
      <div className='flex gap-4'>
        <motion.div
          onClick={() => setMode("clock")}
          className='cursor-pointer'
          whileHover={{ scale: 1.1 }}
        >
          <ClockSvg size={svgSize} />
        </motion.div>
        <motion.div
          onClick={() => setMode("worldClock")}
          className='cursor-pointer'
          whileHover={{ scale: 1.1 }}
        >
          <WorldSvg size={svgSize} />
        </motion.div>
        <motion.div
          onClick={() => setMode("calendar")}
          className='cursor-pointer'
          whileHover={{ scale: 1.1 }}
        >
          <CalendarSvg size={svgSize} />
        </motion.div>
      </div>
      {/* <Quote /> */}
    </div>
  );
};

export default CenterContainer;
