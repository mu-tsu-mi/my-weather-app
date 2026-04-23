import { useWeather } from "../../context/WeatherContext";
import { weatherCondition } from "../../utilities/weatherCondition";
import { WEATHER_CODE } from "../../utilities/weatherCode";
import { WEATHER_IMAGES, defaultImg } from "../../utilities/weatherImage";
import type { WeatherKeys } from "../../utilities/weatherCode";

export default function FiveDayFcstCard() {
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

  if (weather_code === null || weather_code.length === 0) return null;

  const keys: WeatherKeys[] = weather_code
    .map((w) => weatherCondition(w))
    .filter((key) => key !== null);

  const weatherImages: string[] = keys.map((key) =>
    key ? WEATHER_IMAGES[key] : defaultImg,
  );

  const weatherTitles = keys.map((key) =>
    key ? WEATHER_CODE[key].title : "unknown",
  );

  // Adjust format to display: day and time
  const weekdays = time
    ? time.map((t) => {
        return new Intl.DateTimeFormat(undefined, {
          weekday: "short",
        }).format(t);
      })
    : [];

  return (
    <div>
      {keys.map((key, index) => (
        <div key={index}>
          <div>{weekdays[index]}</div>
          <img src={weatherImages[index]} alt={weatherTitles[index]} />
          <div>{weatherTitles[index]}</div>
        </div>
      ))}
    </div>
  );
}
