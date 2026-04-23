import type { WeatherKeys } from "./weatherCode";
import sunny from "../assets/icon-sunny.svg";
import partlyCloudy from "../assets/icon-partlyCloudy.svg";
import cloudy from "../assets/icon-cloudy.svg";
import hazy from "../assets/icon-hazy.svg";
import misty from "../assets/icon-misty.svg";
import lightning from "../assets/icon-lightning.svg";
import foggy from "../assets/icon-foggy.svg";
import drizzle from "../assets/icon-drizzle.svg";
import rain from "../assets/icon-rain.svg";
import snow from "../assets/icon-snow.svg";
import showers from "../assets/icon-showers.svg";
import storm from "../assets/icon-storm.svg";
import defaultIcon from "../assets/icon-default.svg";

const WEATHER_ICONS: Record<WeatherKeys, string> = {
  sunny: sunny,
  partlyCloudy: partlyCloudy,
  cloudy: cloudy,
  dustyOrHazy: hazy,
  misty: misty,
  shallowFog: foggy,
  lightning: lightning,
  foggy: foggy,
  drizzle: drizzle,
  rain: rain,
  snow: snow,
  showers: showers,
  thunderstorm: storm,
};

export { WEATHER_ICONS, defaultIcon };
