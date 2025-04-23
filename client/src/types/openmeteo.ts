interface OpenMeteoWeatherCurrent {
  apparent_temperature: number;
  cloud_cover: number;
  interval: number;
  is_day: number;
  precipitation: number;
  pressure_msl: number;
  rain: number;
  relative_humidity_2m: number;
  showers: number;
  snowfall: number;
  surface_pressure: number;
  temperature_2m: number;
  time: Date;
  weather_code: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
  wind_speed_10m: number;
}

interface OpenMeteoWeatherCurrentUnits {
  apparent_temperature: string;
  cloud_cover: string;
  interval: string;
  precipitation: string;
  pressure_msl: string;
  rain: string;
  relative_humidity_2m: string;
  showers: string;
  snowfall: string;
  surface_pressure: string;
  temperature_2m: string;
  wind_direction_10m: string;
  wind_gusts_10m: string;
  wind_speed_10m: string;
}

interface OpenMeteoMarineCurrent {
  time: string;
  interval: number;
  wave_height: number;
  wave_direction: number;
  wave_period: number;
  wind_wave_height: number;
  wind_wave_direction: number;
  wind_wave_period: number;
  swell_wave_height: number;
  swell_wave_direction: number;
  swell_wave_period: number;
  ocean_current_velocity: number;
  ocean_current_direction: number;
  sea_level_height_msl: number;
  sea_surface_temperature: number;
}

interface OpenMeteoMarineCurrentUnits {
  time: string;
  interval: string;
  wave_height: string;
  wave_direction: string;
  wave_period: string;
  wind_wave_height: string;
  wind_wave_direction: string;
  wind_wave_period: string;
  swell_wave_height: string;
  swell_wave_direction: string;
  swell_wave_period: string;
  ocean_current_velocity: string;
  ocean_current_direction: string;
  sea_level_height_msl: string;
  sea_surface_temperature: string;
}

export type { OpenMeteoWeatherCurrent, OpenMeteoWeatherCurrentUnits, OpenMeteoMarineCurrent, OpenMeteoMarineCurrentUnits };
