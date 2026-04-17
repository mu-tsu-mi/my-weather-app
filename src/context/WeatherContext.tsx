import { useState, useEffect, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { fetchWeatherData } from "../services/open-meteo-api";
import type { WeatherData } from "../services/open-meteo-api";

type WeatherProviderProps = { children: ReactNode };
type WeatherContextType = {
  weather: WeatherData;
  loading: boolean;
  error: string | null;
};

const WeatherContext = createContext<WeatherContextType | null>(null);

export default function WeatherProvider({ children }: WeatherProviderProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData();
        setWeather(data);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error is occuring: {error}</h2>;
  if (!weather) return <h2>Sorry, weather data is not available</h2>;

  return (
    <>
      <WeatherContext value={{ weather, loading, error }}>
        {children}
      </WeatherContext>
    </>
  );
}
