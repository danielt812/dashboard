import type { OpenMeteoWeatherCurrent, OpenMeteoWeatherCurrentUnits } from "../types/openmeteo";
import fetchRetry from "./fetchRetry";

const fetchWeatherDataByCoordinates = async (
  latitude: number,
  longitude: number,
  timezone: string,
  temperatureUnit: string,
  precipitationUnit: string,
  velocityUnit: string
) => {
  try {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.append("latitude", latitude.toString());
    url.searchParams.append("longitude", longitude.toString());
    url.searchParams.append("temperature_unit", temperatureUnit);
    url.searchParams.append("wind_speed_unit", velocityUnit);
    url.searchParams.append("precipitation_unit", precipitationUnit);
    url.searchParams.append("timezone", timezone);
    url.searchParams.append(
      "current",
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m"
    );

    const response = await fetchRetry(url, {}, 3, 1000);
    const data = await response.json();

    const current: OpenMeteoWeatherCurrent = data.current;
    const current_units: OpenMeteoWeatherCurrentUnits = data.current_units;

    return { current, current_units };
  } catch (error) {
    console.error("Error fetching marine data: ", error);
  }
};

export default fetchWeatherDataByCoordinates;
