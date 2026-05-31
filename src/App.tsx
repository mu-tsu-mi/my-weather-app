import { Routes, Route, Link } from "react-router";
import "./App.css";

import CurrentWeatherCard from "./components/current-weather/CurrentWeather";
import SixDayFcstCard from "./components/six-day-fcst/SixDayFcst";
import HourlyFcstCard from "./components/hourly-fcst/HourlyFcst";

function App() {
  return (
    <>
      <section className="weather-wrapper">
        <CurrentWeatherCard />
        <Routes>
          <Route index element={<HourlyFcstCard />} />
          <Route path="/six-day-forecast" element={<SixDayFcstCard />} />
        </Routes>
        <nav>
          <Link to="/">Hourly Forecast</Link>
          <Link to="/six-day-forecast">Daily Forecast</Link>
        </nav>
      </section>
    </>
  );
}

export default App;
