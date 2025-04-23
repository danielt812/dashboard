import type { OpenMeteoMarineCurrent, OpenMeteoMarineCurrentUnits } from "../types/openmeteo";
import fetchRetry from "./fetchRetry";

const fetchMarineDataByCoordinates = async (
  latitude: number,
  longitude: number,
  timezone: string,
  surfTemperatureUnit: string,
  lengthUnit: string,
  velocityUnit: string
) => {
  try {
    const url = new URL("https://marine-api.open-meteo.com/v1/marine");
    url.searchParams.append("latitude", latitude.toString());
    url.searchParams.append("longitude", longitude.toString());
    url.searchParams.append("temperature_unit", surfTemperatureUnit);
    url.searchParams.append("timezone", timezone);
    url.searchParams.append("length_unit", lengthUnit);
    url.searchParams.append("wind_speed_unit", velocityUnit);
    url.searchParams.append("forecast_days", "1");
    url.searchParams.append("current", "wave_height,wave_period,sea_level_height_msl,sea_surface_temperature");

    const response = await fetchRetry(url, {}, 3, 1000);
    const data = await response.json();

    const current: OpenMeteoMarineCurrent = data.current;
    const current_units: OpenMeteoMarineCurrentUnits = data.current_units;

    return { current, current_units };
  } catch (error) {
    console.error("Error fetching marine data: ", error);
  }
};

export default fetchMarineDataByCoordinates;
