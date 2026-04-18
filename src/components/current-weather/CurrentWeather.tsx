import "./CurrentWeather.css";
import { WEATHER_CODE } from "../../utilities/weatherCode";
import { WEATHER_IMAGES, defaultImg } from "../../utilities/weatherImage";
import { weatherCondition } from "../../utilities/weatherCondition";
import { useWeather } from "../../context/WeatherContext";
import type { WeatherKeys } from "../../utilities/weatherCode";

export default function CurrentWeatherCard() {
  const weatherContext = useWeather();
  if (!weatherContext) return null;
  const { weather, loading, error } = weatherContext;
  if (!weather) return null;
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error is occuring: {error}</h2>;

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

  const imageSrc = isWeatherKey(key) ? WEATHER_IMAGES[key] : defaultImg;

  const currentWeather =
    key && isWeatherKey(key) !== false ? WEATHER_CODE[key].title : "Unknown";

  return (
    <>
      <div className="current-card-wrapper">
        <div className="left-side-weather-data">
          <div className="location-group">
            <h2 id="location">My Location</h2>
            <div>{time?.toLocaleDateString()}</div>
            <div>{time?.toLocaleTimeString()}</div>
          </div>
          <div className="weather-group">
            <div>{currentWeather}</div>
            <div>{temperature} degrees</div>
            <div>Wind: {wind} km/h</div>
          </div>
        </div>
        <div className="right-side-weather-image">
          <img src={imageSrc} alt={currentWeather ?? "Unknown Weather"} />
        </div>
      </div>
    </>
  );
}
