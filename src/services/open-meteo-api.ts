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
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
  `\nCoordinates: ${latitude}°N ${longitude}°E`,
  `\nElevation: ${elevation}m asl`,
  `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
  `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
  current: {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    weather_code: current.variables(0)!.value(),
    temperature_2m: current.variables(1)!.value(),
    wind_speed_10m: current.variables(2)!.value(),
    wind_direction_10m: current.variables(3)!.value(),
  },
  hourly: {
    time: Array.from(
      {
        length:
          (Number(hourly.timeEnd()) - Number(hourly.time())) /
          hourly.interval(),
      },
      (_, i) =>
        new Date(
          (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
            1000,
        ),
    ),
    temperature_2m: hourly.variables(0)!.valuesArray(),
    wind_speed_10m: hourly.variables(1)!.valuesArray(),
    wind_direction_10m: hourly.variables(2)!.valuesArray(),
    precipitation: hourly.variables(3)!.valuesArray(),
    weather_code: hourly.variables(4)!.valuesArray(),
  },
  daily: {
    time: Array.from(
      {
        length:
          (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
      },
      (_, i) =>
        new Date(
          (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
            1000,
        ),
    ),
    uv_index_max: daily.variables(0)!.valuesArray(),
    weather_code: daily.variables(1)!.valuesArray(),
    temperature_2m_max: daily.variables(2)!.valuesArray(),
    temperature_2m_min: daily.variables(3)!.valuesArray(),
    wind_speed_10m_max: daily.variables(4)!.valuesArray(),
  },
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log(
  `\nCurrent time: ${weatherData.current.time}\n`,
  `\nCurrent weather_code: ${weatherData.current.weather_code}`,
  `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
  `\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
  `\nCurrent wind_direction_10m: ${weatherData.current.wind_direction_10m}`,
);
console.log("\nHourly data:\n", weatherData.hourly);
console.log("\nDaily data:\n", weatherData.daily);

export { weatherData };
