import "./App.css";
import { weatherData } from "./services/open-meteo-api";

function App() {
  const weatherCodeFromhourlyData = Array.from(
    weatherData.hourly.weather_code ?? [],
  );

  return (
    <>
      <section id="act"></section>
      {weatherCodeFromhourlyData?.map((c, index) => (
        <p key={index}>{c}</p>
      ))}
      <section id="fcst"></section>
    </>
  );
}

export default App;
