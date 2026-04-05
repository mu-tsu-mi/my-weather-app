import "./App.css";
import { fetchWeatherData } from "./services/open-meteo-api";
import type { WeatherData } from "./services/open-meteo-api";

// Update from import/export to UseEffect(then render with useState) or function
function App() {
  return (
    <>
      <section id="act"></section>

      <section id="fcst"></section>
    </>
  );
}

export default App;
