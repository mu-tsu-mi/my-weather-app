import type { WeatherData } from "../services/open-meteo-api";
import { WEATHER_CODE } from "../../utilities/weatherCode";
import type { WeatherKeys, WeatherRange } from "../../utilities/weatherCode";
import sunny from "/src/assets/sunny.png";
import partlyCloudy from "/src/assets/partlyCloudy.png";
import cloudy from "/src/assets/cloudy.png";
import drizzle from "/src/assets/drizzle.png";
import rain from "/src/assets/rain.png";
import showers from "/src/assets/showers.png";
import storm from "/src/assets/storm.png";

export default function CurrentWeatherCard({
  weather,
}: {
  weather: WeatherData;
}) {
  const { current } = weather;
  const {
    temperature_2m,
    time,
    weather_code,
    wind_direction_10m,
    wind_speed_10m,
  } = current;

  const temperature = temperature_2m ? Math.round(temperature_2m) : null;
  const wind =
    wind_direction_10m && wind_speed_10m ? Math.round(wind_speed_10m) : null;

  if (!weather_code) return null;

  const weatherCondition = (): WeatherKeys | null => {
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

  const weatherImages: Record<WeatherKeys, string> = {
    sunny: sunny,
    partlyCloudy: partlyCloudy,
    cloudy: cloudy,
    drizzle: drizzle,
    rain: rain,
    showers: showers,
    thunderstorm: storm,
  };

  // Check key(weatherCondition()) is not null, then render weatherImages[key]
  const isWeatherKey = (k: string | null): k is WeatherKeys =>
    k !== null && k in weatherImages;
  const key = weatherCondition();

  const imageSrc = isWeatherKey(key)
    ? weatherImages[key]
    : "/src/assets/default.png";
  const currentWeather =
    key && isWeatherKey(key) !== false
      ? key.slice(0, 1).toUpperCase() + key.slice(1)
      : "Unknown";

  return (
    <>
      <div className="current-card-wrapper">
        <p>My Location</p>
        <p>{time?.toLocaleDateString()}</p>
        <p>{time?.toLocaleTimeString()}</p>
        <p>{weather_code}</p>
        <p>{currentWeather}</p>
        <img src={imageSrc} alt={currentWeather ?? "Unknown Weather"} />
        <p>{temperature} degrees</p>
        <p>Wind: {wind} km/h</p>
      </div>
    </>
  );
}
