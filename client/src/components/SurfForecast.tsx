import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import getBrowserCoordinates from "../utils/getBrowswerCoordinates";
import { useSettings } from "../context/SettingsContext";

import fetchMarineDataByCoordinates from "../utils/fetchMarineDataByCoordinates";
import fetchLocationByCoordinates from "../utils/fetchLocationByCoordinates";
import fetchLocationByName from "../utils/fetchLocationByName";

import SurfBoardSvg from "../svgs/marine/SurfBoard";
import WaveHeightSvg from "../svgs/marine/WaveHeight";
import WavePeriodSvg from "../svgs/marine/WavePeriod";
import TideSvg from "../svgs/marine/Tide";
import SpinningDots from "../svgs/loader/spinningDots";
import ThermometerSvg from "../svgs/misc/Thermometer";

const SurfForecast = () => {
  const { surfLengthUnit, surfVelocityUnit, surfTemperatureUnit, surfLocation } = useSettings();

  // Marine Data
  const [waveHeight, setWaveHeight] = useState<string>("");
  const [wavePeriod, setWavePeriod] = useState<string>("");
  const [seaTemperature, setSeaTemperature] = useState<string>("");
  const [tideHeight, setTideHeight] = useState<string>("");
  // Location data
  const [city, setCity] = useState<string>("");
  // Widget data
  const [loading, setLoading] = useState<boolean>(false);
  const [showSurfForecastDetails, setShowSurfForecastDetails] = useState<boolean>(false);

  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const fetchWidgetData = async () => {
      try {
        setLoading(true);

        let position;
        let location;
        let latitude;
        let longitude;

        if (surfLocation) {
          position = await fetchLocationByName(surfLocation);
          latitude = position.lat;
          longitude = position.lon;
        } else {
          position = await getBrowserCoordinates();
          latitude = position.latitude;
          longitude = position.longitude;
        }

        location = await fetchLocationByCoordinates(latitude, longitude);
        if (!location) return;

        setCity(location.address.city);

        const marineData = await fetchMarineDataByCoordinates(
          latitude,
          longitude,
          browserTimeZone,
          surfTemperatureUnit,
          surfLengthUnit,
          surfVelocityUnit
        );

        if (!marineData) return;

        const { current, current_units } = marineData;

        // console.log("Marine current:", current);
        // console.log("Marine current_units:", current_units);

        // Round to 1 decimal place
        setWaveHeight(`${Math.round(current.wave_height * 10) / 10}${current_units.wave_height}`);
        setWavePeriod(`${Math.round(current.wave_period * 10) / 10}${current_units.wave_period}`);
        setSeaTemperature(`${Math.round(current.sea_surface_temperature)} ${current_units.sea_surface_temperature}`);
        setTideHeight(`${Math.round(current.sea_level_height_msl * 10) / 10} ${current_units.sea_level_height_msl}`);
      } catch (error) {
        console.error("Error fetching surf forecast data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWidgetData();
  }, [surfLengthUnit, surfVelocityUnit, surfTemperatureUnit, surfLocation]);

  return (
    <>
      {/* Show Loading Spinner While Fetching Data */}
      {loading && (
        <div className='flex justify-end'>
          <SpinningDots size={28} />
        </div>
      )}
      {!loading && (
        <div className='flex flex-col gap-2'>
          <div className='flex justify-start items-center cursor-pointer select-none gap-2 min-h-18'>
            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowSurfForecastDetails(!showSurfForecastDetails)}
            >
              <SurfBoardSvg size={48} />
            </motion.div>
          </div>
          {/* Surf Forecast Details */}
          <AnimatePresence>
            {showSurfForecastDetails && (
              <motion.div
                className='flex flex-col justify-start max-w-2xl rounded-xl p-4 bg-transparent select-none'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                key='box'
                transition={{ duration: 0.2 }}
              >
                <div className='text-xl md:text-2xl mb-2 font-semibold'>
                  {city} <br className='md:hidden' />
                  {surfLocation ? surfLocation : "Surf Forecast"}
                </div>
                <div className='flex flex-col lg:flex-row w-full justify-between md:gap-12 mb-2'>
                  {/* Left */}
                  <div className='flex flex-col md:gap-1'>
                    <MarineDetail
                      label='Height'
                      value={waveHeight}
                      icon={<WaveHeightSvg size={24} />}
                    />
                    <MarineDetail
                      label='Period'
                      value={wavePeriod}
                      icon={<WavePeriodSvg size={24} />}
                    />
                  </div>
                  {/* Right */}
                  <div className='flex flex-col md:gap-1'>
                    <MarineDetail
                      label='Sea Temp'
                      value={seaTemperature}
                      icon={<ThermometerSvg size={24} />}
                    />
                    <MarineDetail
                      label='Tide'
                      value={tideHeight}
                      icon={<TideSvg size={24} />}
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

export default SurfForecast;

interface MarineDetailProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const MarineDetail = ({ label, value, icon }: MarineDetailProps) => (
  <div className='text-lg md:text-2xl flex items-center gap-2 whitespace-nowrap'>
    <span className='text-gray-300'>{label}:</span> {value} {icon && <span className='hidden md:flex'>{icon}</span>}
  </div>
);
