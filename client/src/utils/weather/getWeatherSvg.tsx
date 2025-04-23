// Svg components
import ClearSvg from "../../svgs/weather/Clear";
import MostlySunnySvg from "../../svgs/weather/MostlySunny";
import PartlyCloudySvg from "../../svgs/weather/PartlyCloudy";
import MostlyCloudySvg from "../../svgs/weather/MostlyCloudy";
import FogSvg from "../../svgs/weather/Fog";
import HazySvg from "../../svgs/weather/Hazy";
import RainLightSvg from "../../svgs/weather/RainLight";
import RainHeavySvg from "../../svgs/weather/RainHeavy";
import FreezingRainLightSvg from "../../svgs/weather/FreezingRainLight";
import FreezingRainHeavySvg from "../../svgs/weather/FreezingRainHeavy";
import SnowSvg from "../../svgs/weather/Snow";
import SnowGrainsSvg from "../../svgs/weather/SnowGrains";
import StormHeavySvg from "../../svgs/weather/StormHeavy";
import ClearNightSvg from "../../svgs/weather/ntClear";
import MostlySunnyNightSvg from "../../svgs/weather/ntMostlySunny";
import PartlyCloudyNightSvg from "../../svgs/weather/ntPartlyCloudy";
import MostlyCloudyNightSvg from "../../svgs/weather/ntMostlyCloudy";
import UnknownSvg from "../../svgs/weather/Unknown";

const getWeatherSvg = (weatherCode: number, isDay: number, svgSize: number) => {
  const weatherMap: Record<number, React.ReactNode> = {
    0: isDay ? <ClearSvg size={svgSize} /> : <ClearNightSvg size={svgSize} />,
    1: isDay ? <MostlySunnySvg size={svgSize} /> : <MostlySunnyNightSvg size={svgSize} />,
    2: isDay ? <PartlyCloudySvg size={svgSize} /> : <PartlyCloudyNightSvg size={svgSize} />,
    3: isDay ? <MostlyCloudySvg size={svgSize} /> : <MostlyCloudyNightSvg size={svgSize} />,
    45: <FogSvg size={svgSize} />,
    48: <HazySvg size={svgSize} />,
    51: <RainLightSvg size={svgSize} />,
    61: <RainLightSvg size={svgSize} />,
    80: <RainLightSvg size={svgSize} />,
    52: <RainHeavySvg size={svgSize} />,
    53: <RainHeavySvg size={svgSize} />,
    63: <RainHeavySvg size={svgSize} />,
    65: <RainHeavySvg size={svgSize} />,
    81: <RainHeavySvg size={svgSize} />,
    82: <RainHeavySvg size={svgSize} />,
    56: <FreezingRainLightSvg size={svgSize} />,
    85: <FreezingRainLightSvg size={svgSize} />,
    57: <FreezingRainHeavySvg size={svgSize} />,
    86: <FreezingRainHeavySvg size={svgSize} />,
    71: <SnowSvg size={svgSize} />,
    73: <SnowSvg size={svgSize} />,
    75: <SnowSvg size={svgSize} />,
    77: <SnowGrainsSvg size={svgSize} />,
    95: <StormHeavySvg size={svgSize} />,
    96: <StormHeavySvg size={svgSize} />,
    99: <StormHeavySvg size={svgSize} />,
  };

  return weatherMap[weatherCode] || <UnknownSvg size={svgSize} />;
};

export default getWeatherSvg
