import { useWeather } from "../../context/WeatherContext";
import { weatherCondition } from "../../utilities/weatherCondition";
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
  // Indice
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

  // Convert weather_code to weather condition and filter the next 24 hours only
  const keys: WeatherKeys[] = weather_code
    .filter((_, index) => timeBlocks.includes(index))
    .map((w) => weatherCondition(w))
    .filter((key): key is WeatherKeys => key !== null);

  // List only data for the next 24 hours with 6 time blocks, Use the fourth hour of each block
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
    const temperature = Math.round(temperature24hrs[index]);
    const rainfallInMm = Math.floor(precipitation24hrs[index] * 100) / 100;
    const wind = Math.round(wind24hrs[index]);

    return {
      timeBlock: new Intl.DateTimeFormat(undefined, {
        timeStyle: "short",
      }).format(time24hrs[index]),
      weatherIcon: weatherIcon,
      temperature: temperature,
      precipitation: rainfallInMm,
      windSpeed: wind,
    };
  });

  return (
    <div className="hourly-card-wrapper">
      {weatherDescription.map((w) => (
        <div key={w.timeBlock} className="twentyfour-hour-contents">
          <div>~{w.timeBlock}</div>
        </div>
      ))}
    </div>
  );
}
