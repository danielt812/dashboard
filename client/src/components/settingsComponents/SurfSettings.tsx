import { useState } from "react";
import DropdownSetting from "../uiComponents/DropdownSetting";
import SelectDropdown from "../uiComponents/SelectDropdown";
import InputSetting from "../uiComponents/InputSetting";
import Input from "../uiComponents/Input";

interface SurfSettingsProps {
  surfLengthUnit: string;
  setSurfLengthUnit: (unit: string) => void;
  surfVelocityUnit: string;
  setSurfVelocityUnit: (unit: string) => void;
  surfTemperatureUnit: string;
  setSurfTemperatureUnit: (unit: string) => void;
  surfLocation: string;
  setSurfLocation: (location: string) => void;
}

const SurfSettings = ({
  surfLengthUnit,
  setSurfLengthUnit,
  surfVelocityUnit,
  setSurfVelocityUnit,
  surfTemperatureUnit,
  setSurfTemperatureUnit,
  surfLocation,
  setSurfLocation,
}: SurfSettingsProps) => {
  // Track input locally to prevent re-fetching on every character change
  const [inputValue, setInputValue] = useState(surfLocation);

  return (
    <div className="flex flex-col">
      <DropdownSetting label="Wave Height">
        <SelectDropdown
          options={[
            { name: "imperial", value: "imperial" },
            { name: "metric", value: "metric" },
          ]}
          selected={surfLengthUnit}
          onChange={setSurfLengthUnit}
        />
      </DropdownSetting>
      <DropdownSetting label="Velocity">
        <SelectDropdown
          options={[
            { name: "kph", value: "kph" },
            { name: "mph", value: "mph" },
          ]}
          selected={surfVelocityUnit}
          onChange={setSurfVelocityUnit}
        />
      </DropdownSetting>
      <DropdownSetting label="Temperature">
        <SelectDropdown
          options={[
            { name: "fahrenheit", value: "fahrenheit" },
            { name: "celsius", value: "celsius" },
          ]}
          selected={surfTemperatureUnit}
          onChange={setSurfTemperatureUnit}
        />
      </DropdownSetting>
      <InputSetting label="Location">
        <Input
          value={inputValue}
          onChange={setInputValue}
          onSubmit={setSurfLocation}
          placeholder="Ex: Pipeline, Hawaii"
        />
      </InputSetting>
    </div>
  );
};

export default SurfSettings;
