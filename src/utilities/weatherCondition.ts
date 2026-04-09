import { WEATHER_CODE } from "./weatherCode";
import type { WeatherKeys, WeatherRange } from "./weatherCode";

// Get WeatherKeys
const weatherCondition = (weather_code: number): WeatherKeys | null => {
  for (const [weatherKey, range] of Object.entries(WEATHER_CODE) as [
    WeatherKeys,
    WeatherRange,
  ][]) {
    if (range.min <= weather_code && range.max >= weather_code) {
      return weatherKey;
    }
  }
  // No weather condition matched to the weather code
  return null;
};

export { weatherCondition };
