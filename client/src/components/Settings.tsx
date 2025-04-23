import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "../context/SettingsContext";
import CogSvg from "../svgs/misc/Cog";

import ClockSettings from "./settingsComponents/ClockSettings";
import WorldClockSettings from "./settingsComponents/WorldClockSettings";
import WeatherSettings from "./settingsComponents/WeatherSettings";
import SurfSettings from "./settingsComponents/SurfSettings";

// Type definitions for widget options
type WidgetOption = "Clock" | "World Clock" | "Weather" | "Surf";

const Settings = () => {
  const {
    settingsOpen,
    toggleSettingsOpen,
    widget,
    setWidget,
    clockShowSeconds,
    setClockShowSeconds,
    clock24HourFormat,
    setClock24HourFormat,
    clockShowMeridiem,
    setClockShowMeridiem,
    worldClockShowDate,
    setWorldClockShowDate,
    worldClock24HourFormat,
    setWorldClock24HourFormat,
    worldClockShowMeridiem,
    setWorldClockShowMeridiem,
    selectedTimezones,
    setSelectedTimezones,
    weatherTemperatureUnit,
    setWeatherTemperatureUnit,
    weatherVelocityUnit,
    setWeatherVelocityUnit,
    weatherPrecipitationUnit,
    setWeatherPrecipitationUnit,
    weatherLocation,
    setWeatherLocation,
    surfLengthUnit,
    setSurfLengthUnit,
    surfVelocityUnit,
    setSurfVelocityUnit,
    surfTemperatureUnit,
    setSurfTemperatureUnit,
    surfLocation,
    setSurfLocation
  } = useSettings();

  return (
    <>
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            className='flex flex-col bg-gray-800 text-white rounded-2xl shadow-lg h-full w-full max-w-2xl'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key='box'
            transition={{ duration: 0.2 }}
          >
            {/* Close Button */}
            <div className='flex items-center justify-end mt-2 mx-4'>
              <button
                onClick={toggleSettingsOpen}
                className='text-gray-400 hover:text-white cursor-pointer'
              >
                ✕
              </button>
            </div>

            {/* Header */}
            <div className='md:flex px-4 text-xl md:text-2xl select-none'>
              <div className='w-1/4'>Options</div>
              <div className='hidden md:flex w-3/4'>{widget} Settings</div>
            </div>

            {/* Settings Layout */}
            <div className='md:flex px-4 py-2'>
              {/* Sidebar Navigation */}
              <div className='w-1/4 mb-4 md:mb-0'>
                <ul className='text-sm md:text-lg whitespace-nowrap select-none'>
                  {(["Clock", "World Clock", "Weather", "Surf"] as WidgetOption[]).map((option) => (
                    <li
                      key={option}
                      className={`cursor-pointer ${widget === option ? "text-green-700 hover:text-green-500" : "text-gray-400 hover:text-white"
                        }`}
                      onClick={() => setWidget(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Settings Panel */}
              <div className='w-full md:w-3/4'>
                {widget === "Clock" && (
                  <ClockSettings
                    clockShowSeconds={clockShowSeconds}
                    setClockShowSeconds={setClockShowSeconds}
                    clock24HourFormat={clock24HourFormat}
                    setClock24HourFormat={setClock24HourFormat}
                    clockShowMeridiem={clockShowMeridiem}
                    setClockShowMeridiem={setClockShowMeridiem}
                  />
                )}

                {widget === "World Clock" && (
                  <WorldClockSettings
                    worldClockShowDate={worldClockShowDate}
                    setWorldClockShowDate={setWorldClockShowDate}
                    worldClock24HourFormat={worldClock24HourFormat}
                    setWorldClock24HourFormat={setWorldClock24HourFormat}
                    worldClockShowMeridiem={worldClockShowMeridiem}
                    setWorldClockShowMeridiem={setWorldClockShowMeridiem}
                    selectedTimezones={selectedTimezones}
                    setSelectedTimezones={setSelectedTimezones}
                  />
                )}

                {widget === "Weather" && (
                  <WeatherSettings
                    weatherTemperatureUnit={weatherTemperatureUnit}
                    setWeatherTemperatureUnit={setWeatherTemperatureUnit}
                    weatherVelocityUnit={weatherVelocityUnit}
                    setWeatherVelocityUnit={setWeatherVelocityUnit}
                    weatherPrecipitationUnit={weatherPrecipitationUnit}
                    setWeatherPrecipitationUnit={setWeatherPrecipitationUnit}
                    weatherLocation={weatherLocation}
                    setWeatherLocation={setWeatherLocation}
                  />
                )}

                {widget === "Surf" && (
                  <SurfSettings
                    surfLengthUnit={surfLengthUnit}
                    setSurfLengthUnit={setSurfLengthUnit}
                    surfVelocityUnit={surfVelocityUnit}
                    setSurfVelocityUnit={setSurfVelocityUnit}
                    surfTemperatureUnit={surfTemperatureUnit}
                    setSurfTemperatureUnit={setSurfTemperatureUnit}
                    surfLocation={surfLocation}
                    setSurfLocation={setSurfLocation}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Cog Icon */}
        {!settingsOpen && (
          <motion.div
            onClick={toggleSettingsOpen}
            className='cursor-pointer'
            whileHover={{ rotate: 90, transition: { duration: 0.5 } }}
          >
            <CogSvg size={40} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Settings;

