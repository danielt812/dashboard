import { useState } from "react";
import DropdownSetting from "../uiComponents/DropdownSetting";
import SelectDropdown from "../uiComponents/SelectDropdown";
import InputSetting from "../uiComponents/InputSetting";
import Input from "../uiComponents/Input";

interface WeatherSettingsProps {
  weatherTemperatureUnit: string;
  setWeatherTemperatureUnit: (unit: string) => void;
  weatherVelocityUnit: string;
  setWeatherVelocityUnit: (unit: string) => void;
  weatherPrecipitationUnit: string;
  setWeatherPrecipitationUnit: (unit: string) => void;
  weatherLocation: string;
  setWeatherLocation: (location: string) => void;
}

const WeatherSettings = ({
  weatherTemperatureUnit,
  setWeatherTemperatureUnit,
  weatherVelocityUnit,
  setWeatherVelocityUnit,
  weatherPrecipitationUnit,
  setWeatherPrecipitationUnit,
  weatherLocation,
  setWeatherLocation,
}: WeatherSettingsProps) => {
  const [inputValue, setInputValue] = useState(weatherLocation);
  return(
  <div className='flex flex-col'>
    <DropdownSetting label='Temperature'>
      <SelectDropdown
        options={[
          { name: "fahrenheit", value: "fahrenheit" },
          { name: "celsius", value: "celsius" },
        ]}
        selected={weatherTemperatureUnit}
        onChange={setWeatherTemperatureUnit}
      />
    </DropdownSetting>
    <DropdownSetting label='Wind Speed'>
      <SelectDropdown
        options={[
          { name: "kmh", value: "kmh" },
          { name: "mph", value: "mph" },
          { name: "kn", value: "kn" },
        ]}
        selected={weatherVelocityUnit}
        onChange={setWeatherVelocityUnit}
      />
    </DropdownSetting>
    <DropdownSetting label='Precipitation'>
      <SelectDropdown
        options={[
          { name: "mm", value: "mm" },
          { name: "inch", value: "inch" },
        ]}
        selected={weatherPrecipitationUnit}
        onChange={setWeatherPrecipitationUnit}
      />
    </DropdownSetting>
    <InputSetting label="Location">
        <Input
          value={inputValue}
          onChange={setInputValue}
          onSubmit={setWeatherLocation}
          placeholder="Ex: Honolulu, Hawaii"
        />
      </InputSetting>
  </div>
)};

export default WeatherSettings;
