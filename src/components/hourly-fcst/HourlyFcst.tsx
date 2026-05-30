import "./HourlyFcst.css";
import { useWeather } from "../../context/WeatherContext";
import { weatherCondition } from "../../utilities/weatherCondition";
import { WEATHER_CODE } from "../../utilities/weatherCode";
import type { WeatherKeys } from "../../utilities/weatherCode";
import { WEATHER_ICONS, defaultIcon } from "../../utilities/weatherIcon";

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

  // Indice for the next 24 hours: 4hrs window * 6 blocks
  const currentHourIndex = new Date().getHours() - 1;
  // Set hours for a block
  const blockHours = 4;
  // Indice using the fourth hour's data of each time-block
  const block1Index = currentHourIndex + blockHours;
  const block2Index = currentHourIndex + blockHours * 2;
  const block3Index = currentHourIndex + blockHours * 3;
  const block4Index = currentHourIndex + blockHours * 4;
  const block5Index = currentHourIndex + blockHours * 5;
  const block6Index = currentHourIndex + blockHours * 6;
  const timeBlocks = [
    block1Index,
    block2Index,
    block3Index,
    block4Index,
    block5Index,
    block6Index,
  ];

  // Filter the next 24 hours only, then convert weather_code to weather condition
  const keys: WeatherKeys[] = weather_code
    .filter((_, index) => timeBlocks.includes(index))
    .map((w) => weatherCondition(w))
    .filter((key): key is WeatherKeys => key !== null);

  // List only data for the next 24 hours with 6 time-blocks
  const temperature24hrs = temperature_2m.filter((_, index) =>
    timeBlocks.includes(index),
  );

  const precipitation24hrs = precipitation.filter((_, index) =>
    timeBlocks.includes(index),
  );

  const wind24hrs = wind_speed_10m.filter((_, index) =>
    timeBlocks.includes(index),
  );

  const time24hrs: Date[] = time.filter((_, index) =>
    timeBlocks.includes(index),
  );

  // Prepare hourly weather data
  const weatherDescription = keys.map((key, index) => {
    const weatherIcon: WeatherKeys | string = key
      ? WEATHER_ICONS[key]
      : defaultIcon;
    const weatherTitle = key ? WEATHER_CODE[key].title : "Unknown";
    const temperature = Math.round(temperature24hrs[index]);
    const rainfallInMm = Math.floor(precipitation24hrs[index] * 100) / 100;
    const wind = Math.round(wind24hrs[index]);

    return {
      timeBlock: new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        hour12: true,
      }).format(time24hrs[index]),
      weatherIcon: weatherIcon,
      weatherTitle: weatherTitle,
      temperature: temperature,
      precipitation: rainfallInMm,
      windSpeed: wind,
    };
  });

  return (
    <div className="hourly-card-wrapper">
      {weatherDescription.map((w) => (
        <div key={w.timeBlock} className="twentyfour-hour-contents">
          <div className="no-wrap">~ {w.timeBlock}</div>
          <img src={w.weatherIcon} alt={w.weatherTitle} />
          <div>{w.weatherTitle}</div>
          <div>{w.temperature}°C</div>
          <div>Wind: {w.windSpeed}km/h</div>
          <div>Rain: {w.precipitation}mm</div>
        </div>
      ))}
    </div>
  );
}
