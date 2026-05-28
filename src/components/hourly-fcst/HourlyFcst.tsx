import { useWeather } from "../../context/WeatherContext";
import { weatherCondition } from "../../utilities/weatherCondition";
import type { WeatherKeys } from "../../utilities/weatherCode";

export default function HourlyFcstCard() {
  const weatherContext = useWeather();
  if (!weatherContext) return null;
  const { weather, loading, error } = weatherContext;
  if (!weather) return null;
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error is occuring: {error}</h2>;

  const { hourly } = weather;
  const {
    precipitation,
    temperature_2m,
    time,
    weather_code,
    wind_direction_10m,
    wind_speed_10m,
  } = hourly;

  // Checking weather data from API
  if (weather_code === null || weather_code.length === 0) return null;
  if (precipitation === null || precipitation.length === 0) return null;
  if (temperature_2m === null || temperature_2m.length === 0) return null;
  if (time === null || time.length === 0) return null;
  if (wind_direction_10m === null || wind_direction_10m.length === 0)
    return null;
  if (wind_speed_10m === null || wind_speed_10m.length === 0) return null;

  // Indice for the next 24 hours: get current time, round-down & add 24hr 4hrs window * 6
  const currentHourIndex = new Date().getHours();
  const block1Index = currentHourIndex + 3;
  const block2Index = currentHourIndex + 7;
  const block3Index = currentHourIndex + 11;
  const block4Index = currentHourIndex + 15;
  const block5Index = currentHourIndex + 19;
  const block6Index = currentHourIndex + 23;

  // Convert weather_code to weather condition and skip the current day
  const keys: WeatherKeys[] = weather_code
    .filter((_, index) => index >= currentHourIndex && index <= block6Index)
    .map((w) => weatherCondition(w))
    .filter((key): key is WeatherKeys => key !== null);

  return <>Hourly Fcst</>;
}
