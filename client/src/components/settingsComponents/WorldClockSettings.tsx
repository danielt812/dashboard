import timezones from "../../json/timezones.json";

import ToggleSetting from "../uiComponents/ToggleSetting";
import DropdownSetting from "../uiComponents/DropdownSetting";
import MultiSelectDropdown from "../uiComponents/MultiSelectDropdown";

interface WorldClockSettingsProps {
  worldClockShowDate: boolean;
  setWorldClockShowDate: (value: boolean) => void;
  worldClock24HourFormat: boolean;
  setWorldClock24HourFormat: (value: boolean) => void;
  worldClockShowMeridiem: boolean;
  setWorldClockShowMeridiem: (value: boolean) => void;
  selectedTimezones: string[];
  setSelectedTimezones: (timezones: string[]) => void;
}

const WorldClockSettings = ({
  worldClockShowDate,
  setWorldClockShowDate,
  worldClock24HourFormat,
  setWorldClock24HourFormat,
  worldClockShowMeridiem,
  setWorldClockShowMeridiem,
  selectedTimezones,
  setSelectedTimezones,
}: WorldClockSettingsProps) => (
  <div className='flex flex-col'>
    <ToggleSetting
      label='Show Date'
      value={worldClockShowDate}
      onChange={setWorldClockShowDate}
    />
    <ToggleSetting
      label='24-Hour Format'
      value={worldClock24HourFormat}
      onChange={setWorldClock24HourFormat}
    />
    {!worldClock24HourFormat && (
      <ToggleSetting
        label='Show Meridiem'
        value={worldClockShowMeridiem}
        onChange={setWorldClockShowMeridiem}
      />
    )}
    <DropdownSetting label='Timezones'>
      <MultiSelectDropdown
        options={timezones}
        selected={selectedTimezones}
        onChange={setSelectedTimezones}
        maxSelections={5}
        openUpwards
      />
    </DropdownSetting>
  </div>
);

export default WorldClockSettings;
