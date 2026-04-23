type WeatherRange = { min: number; max: number; title: string };
type WeatherKeys =
  | "sunny"
  | "partlyCloudy"
  | "cloudy"
  | "mistyOrHazy"
  | "foggy"
  | "drizzle"
  | "rain"
  | "snow"
  | "showers"
  | "thunderstorm";

const WEATHER_CODE: Record<WeatherKeys, WeatherRange> = {
  sunny: { min: 0, max: 1, title: "Sunny" },
  partlyCloudy: { min: 2, max: 2, title: "Partly Cloudy" },
  cloudy: { min: 3, max: 3, title: "Cloudy" },
  mistyOrHazy: { min: 5, max: 19, title: "Misty or Hazy" },
  foggy: { min: 40, max: 49, title: "Foggy" },
  drizzle: { min: 50, max: 59, title: "Drizzle" },
  rain: { min: 60, max: 69, title: "Rain" },
  snow: { min: 70, max: 79, title: "Snowy" },
  showers: { min: 80, max: 82, title: "Showers" },
  thunderstorm: { min: 95, max: 99, title: "Thunderstorm" },
};

export type { WeatherKeys, WeatherRange };
export { WEATHER_CODE };
