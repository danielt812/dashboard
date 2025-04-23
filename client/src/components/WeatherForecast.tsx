import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import getWeatherSvg from "../utils/weather/getWeatherSvg";
import getWeatherDescription from "../utils/weather/getWeatherDescription";
import ArrowUpSvg from "../svgs/misc/ArrowUp";
import getLocation from "../utils/getBrowswerCoordinates";
import SpinningDots from "../svgs/loader/spinningDots";
import { useSettings } from "../context/SettingsContext";

import fetchWeatherDataByCoordinates from "../utils/fetchWeatherDataByCoordinates";
import fetchLocationByCoordinates from "../utils/fetchLocationByCoordinates";
import fetchLocationByName from "../utils/fetchLocationByName";

const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const WeatherForecast = () => {
  // Get settings from context
  const { weatherTemperatureUnit, weatherVelocityUnit, weatherPrecipitationUnit, weatherLocation } = useSettings();

  // Weather data
  const [temperature, setTemperature] = useState<string>("");
  const [weatherDescription, setWeatherDescription] = useState<string>("");
  const [precipitation, setPrecipitation] = useState<string>("");
  const [windSpeed, setWindSpeed] = useState<string>("");
  const [windDirection, setWindDirection] = useState<string>("");
  const [feelsLike, setFeelsLike] = useState<string>("");
  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [isDay, setIsDay] = useState<number>(0);
  // Location data
  const [city, setCity] = useState<string>("");
  // Widget data
  const [loading, setLoading] = useState<boolean>(false);
  const [showWeatherDetails, setShowWeatherDetails] = useState<boolean>(false);

  useEffect(() => {
    const fetchWidgetData = async () => {
      try {
        setLoading(true);

        let position;
        let location;
        let latitude;
        let longitude;

        if (weatherLocation) {
          position = await fetchLocationByName(weatherLocation);
          latitude = position.lat;
          longitude = position.lon;
        } else {
          position = await getLocation();
          latitude = position.latitude;
          longitude = position.longitude;
        }

        location = await fetchLocationByCoordinates(latitude, longitude);
        if (!location) return;

        setCity(location.address.city);

        const weatherData = await fetchWeatherDataByCoordinates(
          latitude,
          longitude,
          browserTimeZone,
          weatherTemperatureUnit,
          weatherPrecipitationUnit,
          weatherVelocityUnit
        );

        if (!weatherData) return;

        const { current, current_units } = weatherData;

        // console.log("Weather current:", current);
        // console.log("Weather current_units:", current_units);

        setTemperature(`${Math.round(current.temperature_2m)} ${current_units.temperature_2m}`);
        setFeelsLike(`${Math.round(current.apparent_temperature)} ${current_units.apparent_temperature}`);
        setPrecipitation(`${current.precipitation} ${current_units.precipitation}`);
        setWindSpeed(`${current.wind_speed_10m} ${current_units.wind_speed_10m.replace("/", "")}`);
        setWindDirection(`${current.wind_direction_10m} ${current_units.wind_direction_10m}`);
        setWeatherCode(current.weather_code);
        setWeatherDescription(getWeatherDescription(current.weather_code));
        setIsDay(current.is_day);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWidgetData();
  }, [weatherTemperatureUnit, weatherVelocityUnit, weatherPrecipitationUnit, weatherLocation]);

  return (
    <>
      {loading && (
        <div className='flex justify-end'>
          <SpinningDots size={28} />
        </div>
      )}
      {!loading && (
        <div className='flex flex-col gap-2'>
          <div className='flex-0 self-end select-none'>
            <div
              className='flex justify-center items-center cursor-pointer gap-2'
              onClick={() => setShowWeatherDetails(!showWeatherDetails)}
            >
              <motion.div whileHover={{ scale: 1.1 }}>{getWeatherSvg(weatherCode, isDay, 48)}</motion.div>
              <div className='text-2xl font-semibold'>{temperature}</div>
            </div>
            <div className='text-md w-full'>{city}</div>
          </div>

          {/* Weather Details Container */}
          <AnimatePresence>
            {showWeatherDetails && (
              <motion.div
                className='flex flex-col w-full self-center md:self-end rounded-xl p-4 bg-transparent select-none'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                key='box'
                transition={{ duration: 0.2 }}
              >
                <div className='text-xl md:text-2xl mb-2 font-semibold'>
                  {city} <br className='md:hidden' /> Weather
                </div>
                <div className='flex flex-col lg:flex-row w-full justify-between gap-2 md:gap-16'>
                  <div className='flex flex-col gap-2'>
                    <div className='text-md md:text-lg'>{weatherDescription}</div>
                    <div className='flex items-center gap-1 sm:gap-2'>
                      <div className='hidden md:flex'>{getWeatherSvg(weatherCode, isDay, 64)}</div>
                      <div className='flex md:hidden'>{getWeatherSvg(weatherCode, isDay, 32)}</div>
                      <div className='text-sm md:text-4xl bold whitespace-nowrap'>{temperature}</div>
                    </div>
                  </div>
                  <div>
                    <WeatherDetail
                      label='Feels like'
                      value={feelsLike}
                    />
                    <WeatherDetail
                      label='Precipitation'
                      value={precipitation}
                    />
                    <WeatherDetail
                      label='Wind'
                      value={windSpeed}
                      windDirection={windDirection}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default WeatherForecast;

interface WeatherDetailProps {
  label: string;
  value: string;
  windDirection?: string;
}

const WeatherDetail = ({ label, value, windDirection }: WeatherDetailProps) => (
  <div className='flex gap-2 text-lg md:text-2xl whitespace-nowrap'>
    <span className='text-gray-300'>{label}:</span> {value}
    {windDirection && (
      <div
        className='transform'
        style={{ rotate: `${parseInt(windDirection, 10)}deg` }}
      >
        <span className='hidden md:flex'>
          <ArrowUpSvg size={24} />
        </span>
      </div>
    )}
  </div>
);
