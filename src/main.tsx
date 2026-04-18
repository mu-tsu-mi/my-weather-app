import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { WeatherProvider } from "./context/WeatherContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </BrowserRouter>
  </StrictMode>,
);
