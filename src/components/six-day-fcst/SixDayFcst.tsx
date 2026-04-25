import "./SixDayFcst.css";
import { useWeather } from "../../context/WeatherContext";
import { weatherCondition } from "../../utilities/weatherCondition";
import { WEATHER_CODE } from "../../utilities/weatherCode";
import { WEATHER_ICONS, defaultIcon } from "../../utilities/weatherIcon";
import type { WeatherKeys } from "../../utilities/weatherCode";

export default function SixDayFcstCard() {
  const weatherContext = useWeather();
  if (!weatherContext) return null;
  const { weather, loading, error } = weatherContext;
  if (!weather) return null;
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error is occuring: {error}</h2>;

  const { daily } = weather;
  const {
    temperature_2m_max,
    temperature_2m_min,
    time,
    uv_index_max,
    weather_code,
    wind_speed_10m_max,
  } = daily;

  // Checking weather data from API
  if (weather_code === null || weather_code.length === 0) return null;
  if (time === null) return null;
  if (temperature_2m_max === null) return null;
  if (temperature_2m_min === null) return null;
  if (wind_speed_10m_max === null) return null;
  if (uv_index_max === null) return null;

  // Convert weather_code to weather condition and skip the current day
  const keys: WeatherKeys[] = weather_code
    .slice(1)
    .map((w) => weatherCondition(w))
    .filter((key): key is WeatherKeys => key !== null);

  // Skip the current day
  const timeForSixDays = time.slice(1);
  const maxTempForSixDays = temperature_2m_max.slice(1);
  const minTempForSixDays = temperature_2m_min.slice(1);
  const windForSixDays = wind_speed_10m_max.slice(1);
  const uvForSixDays = uv_index_max.slice(1);

  // Prepare daily weather data
  const weatherDescription = keys.map((key, index) => {
    const weatherIcon: WeatherKeys | string = key
      ? WEATHER_ICONS[key]
      : defaultIcon;
    const weatherTitle: string = key ? WEATHER_CODE[key].title : "unknown";
    const maxTemp = Math.round(maxTempForSixDays[index]);
    const minTemp = Math.round(minTempForSixDays[index]);
    const wind = Math.round(windForSixDays[index]);
    const uv = Math.round(uvForSixDays[index]);

    return {
      key: key,
      icon: weatherIcon,
      title: weatherTitle,
      weekday: new Intl.DateTimeFormat(undefined, {
        weekday: "short",
      }).format(timeForSixDays[index]),
      maxTemp: maxTemp,
      minTemp: minTemp,
      wind: wind,
      uvIndex: uv,
    };
  });

  return (
    <div className="five-day-card-wrapper">
      {weatherDescription.map((weatherData) => (
        <div key={weatherData.weekday} className="five-day-contents">
          <div>{weatherData.weekday}</div>
          <img src={weatherData.icon} alt={weatherData.title} />
          <div>{weatherData.title}</div>
          <div>{weatherData.maxTemp}°C Max</div>
          <div>{weatherData.minTemp}°C Min</div>
          <div>{weatherData.wind}km/h</div>
          <div>UV: {weatherData.uvIndex}</div>
        </div>
      ))}
    </div>
  );
}
