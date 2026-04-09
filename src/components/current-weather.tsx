import type { WeatherData } from "../services/open-meteo-api";
import { WEATHER_IMAGES } from "../utilities/weatherImage";
import { weatherCondition } from "../utilities/weatherCondition";
import type { WeatherKeys } from "../utilities/weatherCode";

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

  // Check key(weatherCondition()) is not null, then render weatherImages[key]
  const isWeatherKey = (k: string | null): k is WeatherKeys =>
    k !== null && k in WEATHER_IMAGES;
  const key = weatherCondition(weather_code);

  const imageSrc = isWeatherKey(key)
    ? WEATHER_IMAGES[key]
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
