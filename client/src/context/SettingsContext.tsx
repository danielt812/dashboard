import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SettingsContextType {
  settingsOpen: boolean;
  toggleSettingsOpen: () => void;
  widget: string;
  setWidget: (widget: string) => void;
  clockShowSeconds: boolean;
  setClockShowSeconds: (value: boolean) => void;
  clock24HourFormat: boolean;
  setClock24HourFormat: (value: boolean) => void;
  clockShowMeridiem: boolean;
  setClockShowMeridiem: (value: boolean) => void;
  worldClockShowDate: boolean;
  setWorldClockShowDate: (value: boolean) => void;
  worldClock24HourFormat: boolean;
  setWorldClock24HourFormat: (value: boolean) => void;
  worldClockShowMeridiem: boolean;
  setWorldClockShowMeridiem: (value: boolean) => void;
  selectedTimezones: string[];
  setSelectedTimezones: (timezones: string[]) => void;
  weatherTemperatureUnit: string;
  setWeatherTemperatureUnit: (unit: string) => void;
  weatherVelocityUnit: string;
  setWeatherVelocityUnit: (unit: string) => void;
  weatherPrecipitationUnit: string;
  setWeatherPrecipitationUnit: (unit: string) => void;
  weatherLocation: string;
  setWeatherLocation: (location: string) => void;
  surfLengthUnit: string;
  setSurfLengthUnit: (unit: string) => void;
  surfVelocityUnit: string;
  setSurfVelocityUnit: (unit: string) => void;
  surfTemperatureUnit: string;
  setSurfTemperatureUnit: (unit: string) => void;
  surfLocation: string;
  setSurfLocation: (location: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // Load settings from localStorage
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem("userSettings");
      return savedSettings ? JSON.parse(savedSettings) : {};
    } catch (error) {
      console.error("Failed to load settings:", error);
      return {};
    }
  };

  const savedSettings = loadSettings();

  // State with default values or saved values
  const [settingsOpen, setSettingsOpen] = useState<boolean>(savedSettings.settingsOpen ?? true);
  const [widget, setWidget] = useState<string>(savedSettings.widget ?? "Surf");

  // Clock settings
  const [clockShowSeconds, setClockShowSeconds] = useState<boolean>(savedSettings.clockShowSeconds ?? true);
  const [clock24HourFormat, setClock24HourFormat] = useState<boolean>(savedSettings.clock24HourFormat ?? false);
  const [clockShowMeridiem, setClockShowMeridiem] = useState<boolean>(savedSettings.clockShowMeridiem ?? true);
  // World Clock settings
  const [worldClockShowDate, setWorldClockShowDate] = useState<boolean>(savedSettings.worldClockShowDate ?? true);
  const [worldClock24HourFormat, setWorldClock24HourFormat] = useState<boolean>(savedSettings.worldClock24HourFormat ?? false);
  const [worldClockShowMeridiem, setWorldClockShowMeridiem] = useState<boolean>(savedSettings.worldClockShowMeridiem ?? true);
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>(savedSettings.selectedTimezones ?? []);
  // Weather settings
  const [weatherTemperatureUnit, setWeatherTemperatureUnit] = useState<string>(savedSettings.weatherTemperatureUnit ?? "fahrenheit");
  const [weatherVelocityUnit, setWeatherVelocityUnit] = useState<string>(savedSettings.weatherVelocityUnit ?? "mph");
  const [weatherPrecipitationUnit, setWeatherPrecipitationUnit] = useState<string>(savedSettings.weatherPrecipitationUnit ?? "inch");
  const [weatherLocation, setWeatherLocation] = useState<string>(savedSettings.weatherLocation ?? "");
  // Surf settings
  const [surfLengthUnit, setSurfLengthUnit] = useState<string>(savedSettings.surfLengthUnit ?? "imperial");
  const [surfVelocityUnit, setSurfVelocityUnit] = useState<string>(savedSettings.surfVelocityUnit ?? "mph");
  const [surfTemperatureUnit, setSurfTemperatureUnit] = useState<string>(savedSettings.surfTemperatureUnit ?? "fahrenheit");
  const [surfLocation, setSurfLocation] = useState<string>(savedSettings.surfLocation ?? "");

  const toggleSettingsOpen = () => setSettingsOpen((prev) => !prev);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      settingsOpen,
      widget,
      clockShowSeconds,
      clock24HourFormat,
      clockShowMeridiem,
      worldClockShowDate,
      worldClock24HourFormat,
      worldClockShowMeridiem,
      selectedTimezones,
      weatherTemperatureUnit,
      weatherVelocityUnit,
      weatherPrecipitationUnit,
      weatherLocation,
      surfLengthUnit,
      surfVelocityUnit,
      surfTemperatureUnit,
      surfLocation
    };

    try {
      localStorage.setItem("userSettings", JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  }, [
    settingsOpen,
    widget,
    clockShowSeconds,
    clock24HourFormat,
    clockShowMeridiem,
    worldClockShowDate,
    worldClock24HourFormat,
    worldClockShowMeridiem,
    selectedTimezones,
    weatherTemperatureUnit,
    weatherVelocityUnit,
    weatherPrecipitationUnit,
    weatherLocation,
    surfLengthUnit,
    surfVelocityUnit,
    surfTemperatureUnit,
    surfLocation
  ]);

  return (
    <SettingsContext.Provider
      value={{
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
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
