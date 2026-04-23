import type { WeatherKeys } from "./weatherCode";
import sunny from "../assets/sunny.png";
import partlyCloudy from "../assets/partlyCloudy.png";
import cloudy from "../assets/cloudy.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import showers from "../assets/showers.png";
import storm from "../assets/storm.png";
import neutralWeather from "../assets/neutralWeather.svg";
import defaultImg from "../assets/default.png";

const WEATHER_IMAGES: Record<WeatherKeys, string> = {
  sunny: sunny,
  partlyCloudy: partlyCloudy,
  cloudy: cloudy,
  dustyOrHazy: neutralWeather,
  misty: neutralWeather,
  shallowFog: neutralWeather,
  lightning: neutralWeather,
  foggy: neutralWeather,
  drizzle: drizzle,
  rain: rain,
  snow: neutralWeather,
  showers: showers,
  thunderstorm: storm,
};

export { WEATHER_IMAGES, defaultImg };
