import Weather from "../components/WeatherForecast";

const TopRightContainer = () => {
  return (
    <div className="flex justify-end items-start h-36 w-full">
      <Weather />
    </div>
  );
};

export default TopRightContainer;
