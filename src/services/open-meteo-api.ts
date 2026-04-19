import { fetchWeatherApi } from "openmeteo";

const params = {
  latitude: -37.8038125,
  longitude: 144.9515625,
  daily: [
    "uv_index_max",
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "wind_speed_10m_max",
  ],
  hourly: [
    "temperature_2m",
    "wind_speed_10m",
    "wind_direction_10m",
    "precipitation",
    "weather_code",
  ],
  current: [
    "weather_code",
    "temperature_2m",
    "wind_speed_10m",
    "wind_direction_10m",
  ],
  timezone: "Australia/Sydney",
};
const url = "https://api.open-meteo.com/v1/forecast";

interface CurrentWeather {
  time: Date | null;
  weather_code: number | null;
  temperature_2m: number | null;
  wind_speed_10m: number | null;
  wind_direction_10m: number | null;
}
interface HourlyWeather {
  time: Date[] | null;
  temperature_2m: number[] | null;
  wind_speed_10m: number[] | null;
  wind_direction_10m: number[] | null;
  precipitation: number[] | null;
  weather_code: number[] | null;
}
interface DailyWeather {
  time: Date[] | null;
  uv_index_max: number[] | null;
  weather_code: number[] | null;
  temperature_2m_max: number[] | null;
  temperature_2m_min: number[] | null;
  wind_speed_10m_max: number[] | null;
}

interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}

const fetchWeatherData = async (): Promise<WeatherData> => {
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const latitude = response.latitude();
  const longitude = response.longitude();
  const elevation = response.elevation();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();

  // Removed: sample from meteo API
  // const utcOffsetSeconds = response.utcOffsetSeconds();
  // console.log(`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,)

  console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
  );

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date(Number(current.time()) * 1000),
      weather_code: current.variables(0)!.value() ?? null,
      temperature_2m: current.variables(1)!.value() ?? null,
      wind_speed_10m: current.variables(2)!.value() ?? null,
      wind_direction_10m: current.variables(3)!.value() ?? null,
    },
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date((Number(hourly.time()) + i * hourly.interval()) * 1000),
      ),
      temperature_2m: hourly.variables(0)?.valuesArray()
        ? Array.from(hourly.variables(0)!.valuesArray()!)
        : null,
      wind_speed_10m: hourly.variables(1)?.valuesArray()
        ? Array.from(hourly.variables(1)!.valuesArray()!)
        : null,
      wind_direction_10m: hourly.variables(2)?.valuesArray()
        ? Array.from(hourly.variables(2)!.valuesArray()!)
        : null,
      precipitation: hourly.variables(3)?.valuesArray()
        ? Array.from(hourly.variables(3)!.valuesArray()!)
        : null,
      weather_code: hourly.variables(4)?.valuesArray()
        ? Array.from(hourly.variables(4)!.valuesArray()!)
        : null,
    },
    daily: {
      time: Array.from(
        {
          length:
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        },
        (_, i) =>
          new Date((Number(daily.time()) + i * daily.interval()) * 1000),
      ),
      uv_index_max: daily.variables(0)?.valuesArray()
        ? Array.from(daily.variables(0)!.valuesArray()!)
        : null,
      weather_code: daily.variables(1)?.valuesArray()
        ? Array.from(daily.variables(1)!.valuesArray()!)
        : null,
      temperature_2m_max: daily.variables(2)?.valuesArray()
        ? Array.from(daily.variables(2)!.valuesArray()!)
        : null,
      temperature_2m_min: daily.variables(3)?.valuesArray()
        ? Array.from(daily.variables(3)!.valuesArray()!)
        : null,
      wind_speed_10m_max: daily.variables(4)?.valuesArray()
        ? Array.from(daily.variables(4)!.valuesArray()!)
        : null,
    },
  };
  return weatherData;
};

export type { WeatherData };
export { fetchWeatherData };
/* Don't use nullish coalescing operator '??' for api fetch 
ex) Array.from(hourly.variables(0).valuesArray() ?? null
 to avoid runtime error. Instead, hourly.variables(0)?.valuesArray() ? Array.from(hourly.variables(0)!.valuesArray()!) : null
*/
