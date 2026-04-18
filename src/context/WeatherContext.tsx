import { useState, useEffect, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { fetchWeatherData } from "../services/open-meteo-api";
import type { WeatherData } from "../services/open-meteo-api";

type WeatherProviderProps = { children: ReactNode };
type WeatherContextType = {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
};

const WeatherContext = createContext<WeatherContextType | null>(null);

export function WeatherProvider({ children }: WeatherProviderProps) {
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

  return (
    <>
      <WeatherContext value={{ weather, loading, error }}>
        {children}
      </WeatherContext>
    </>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
