type WeatherRange = { min: number; max: number };
type WeatherKeys =
  | "sunny"
  | "partlyCloudy"
  | "cloudy"
  | "drizzle"
  | "rain"
  | "showers"
  | "thunderstorm";

const WEATHER_CODE: Record<WeatherKeys, WeatherRange> = {
  sunny: { min: 0, max: 1 },
  partlyCloudy: { min: 2, max: 2 },
  cloudy: { min: 3, max: 3 },
  drizzle: { min: 50, max: 59 },
  rain: { min: 60, max: 69 },
  showers: { min: 80, max: 82 },
  thunderstorm: { min: 95, max: 99 },
};

export type { WeatherKeys, WeatherRange };
export { WEATHER_CODE };
