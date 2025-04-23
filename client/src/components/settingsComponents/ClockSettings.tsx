import ToggleSetting from "../uiComponents/ToggleSetting";

interface ClockSettingsProps {
  clockShowSeconds: boolean;
  setClockShowSeconds: (value: boolean) => void;
  clock24HourFormat: boolean;
  setClock24HourFormat: (value: boolean) => void;
  clockShowMeridiem: boolean;
  setClockShowMeridiem: (value: boolean) => void;
}

const ClockSettings = ({ clockShowSeconds, setClockShowSeconds, clock24HourFormat, setClock24HourFormat, clockShowMeridiem, setClockShowMeridiem }: ClockSettingsProps) => (
  <div className="flex flex-col gap-1">
    <ToggleSetting label="Show Seconds" value={clockShowSeconds} onChange={setClockShowSeconds} />
    <ToggleSetting label="24-Hour Format" value={clock24HourFormat} onChange={setClock24HourFormat} />
    {!clock24HourFormat && <ToggleSetting label="Show Meridiem" value={clockShowMeridiem} onChange={setClockShowMeridiem} />}
  </div>
);

export default ClockSettings
