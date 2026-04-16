import type { WeatherKeys } from "./weatherCode";
import sunny from "../assets/sunny.png";
import partlyCloudy from "../assets/partlyCloudy.png";
import cloudy from "../assets/cloudy.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import showers from "../assets/showers.png";
import storm from "../assets/storm.png";
import defaultImg from "../assets/default.png";

const WEATHER_IMAGES: Record<WeatherKeys, string> = {
  sunny: sunny,
  partlyCloudy: partlyCloudy,
  cloudy: cloudy,
  drizzle: drizzle,
  rain: rain,
  showers: showers,
  thunderstorm: storm,
};

export { WEATHER_IMAGES, defaultImg };
