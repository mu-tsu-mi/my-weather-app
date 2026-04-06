import type { WeatherData } from "../services/open-meteo-api";

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

  return (
    <>
      <div className="current-card-wrapper">
        <p>My Location</p>
        <p>{time?.toLocaleDateString()}</p>
        <p>{time?.toLocaleTimeString()}</p>
        <p>{weather_code}</p>
        <p>{temperature} degrees</p>
        <p>Wind: {wind} km/h</p>
      </div>
    </>
  );
}
