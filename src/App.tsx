import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import { fetchWeatherData } from "./services/open-meteo-api";
import type { WeatherData } from "./services/open-meteo-api";

import CurrentWeatherCard from "./components/current-weather/CurrentWeather";
import SixDayFcstCard from "./components/six-day-fcst/SixDayFcst";

function App() {
  // const [weather, setWeather] = useState<WeatherData | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchWeatherData();
  //       setWeather(data);
  //       setError(null);
  //     } catch (error) {
  //       setError(error instanceof Error ? error.message : String(error));
  //       setWeather(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // if (loading) return <h2>Loading...</h2>;
  // if (error) return <h2>Error is occuring: {error}</h2>;
  // if (!weather) return <h2>Sorry, weather data is not available</h2>;

  return (
    <>
      <section className="weather-wrapper">
        <CurrentWeatherCard />
        {/* HourlyFcstCard */}
        <SixDayFcstCard />
      </section>
    </>
  );
}

export default App;
