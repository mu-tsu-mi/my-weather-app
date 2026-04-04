## Plan: Open-Meteo Weather App MVP

Build a small `React + TypeScript + Vite` app for one fixed location, using `Open-Meteo` directly from the browser. Recommended approach: ship an MVP with current conditions + a short forecast first, keep the API layer typed and isolated, and only add polish after the basic data flow is stable.

**Steps**

1. **Phase 1 — Project setup**
   - Scaffold the app with the Vite `react-ts` template.
   - Decide the fixed location up front and store its `latitude`, `longitude`, and display name in a dedicated config file.
   - Keep the first version intentionally small: one page, one location, no routing. This phase blocks all later work.
2. **Phase 2 — Define the data contract** _depends on 1_
   - Use `Open-Meteo`’s `/v1/forecast` endpoint with `latitude`, `longitude`, `timezone=auto`, and only the fields needed for the UI.
   - Recommended starter query shape:
     - `current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,weather_code,wind_speed_10m`
     - `hourly=temperature_2m,precipitation_probability,weather_code`
     - `daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset`
   - Create TypeScript types for both the raw API response and the normalized UI model.
3. **Phase 3 — Data fetching layer** _depends on 2_
   - Create a small `weatherApi` module responsible only for calling `Open-Meteo` and validating/normalizing the response.
   - Add a `useWeatherData` hook to expose `loading`, `error`, `data`, and `refresh` state to the UI.
   - Keep the hook parameterized by `lat/lon` even if V1 uses one hardcoded location, so future expansion is easy.
4. **Phase 4 — UI composition** _depends on 3_
   - Start with a single dashboard page in `App.tsx`.
   - Build the UI in this order:
     1. current weather summary
     2. today/next-hours forecast strip
     3. 5–7 day forecast cards
   - Translate `weather_code` values into user-friendly labels/icons using the documented WMO code mapping from `Open-Meteo`.
5. **Phase 5 — State polish and resilience** _parallel with late Phase 4 once the data contract is stable_
   - Add a clear loading state, friendly error state, and a manual refresh action.
   - Add lightweight caching or a refresh interval only after the core fetch path works.
   - Ensure timestamps display in the local timezone returned by `timezone=auto`.
6. **Phase 6 — Styling and deployment** _depends on 4 and 5_
   - Make the layout responsive for mobile first, then widen for desktop.
   - Keep styling simple at first; visual polish like gradients, icons, and day/night theming can come last.
   - Deploy to a static host such as Vercel or Netlify once the production build is clean.

**Relevant files**

- `/Users/mishihara/code/my-weather-app/package.json` — project scripts and dependencies after scaffolding
- `/Users/mishihara/code/my-weather-app/src/main.tsx` — app bootstrap
- `/Users/mishihara/code/my-weather-app/src/App.tsx` — top-level page composition
- `/Users/mishihara/code/my-weather-app/src/config/location.ts` — fixed location coordinates and label
- `/Users/mishihara/code/my-weather-app/src/services/weatherApi.ts` — `Open-Meteo` request construction and normalization
- `/Users/mishihara/code/my-weather-app/src/hooks/useWeatherData.ts` — fetch lifecycle and UI-facing state
- `/Users/mishihara/code/my-weather-app/src/types/weather.ts` — raw API and normalized weather types
- `/Users/mishihara/code/my-weather-app/src/components/CurrentWeather.tsx` — summary card for current conditions
- `/Users/mishihara/code/my-weather-app/src/components/HourlyForecast.tsx` — next-hours forecast display
- `/Users/mishihara/code/my-weather-app/src/components/DailyForecast.tsx` — 5–7 day forecast list/cards
- `/Users/mishihara/code/my-weather-app/src/utils/weatherCodes.ts` — WMO code to label/icon mapping
- `/Users/mishihara/code/my-weather-app/src/index.css` or app CSS files — responsive layout and visual styling

**Verification**

1. Confirm the Vite starter runs locally without TypeScript errors.
2. Verify the page shows data for the chosen fixed location after an initial loading state.
3. Break the API URL intentionally once and confirm the app shows a useful error message instead of a blank screen.
4. Check that daily data lines up with the correct local timezone and dates.
5. Run a production build before deployment to catch type and bundling issues.
6. Manually review the UI on a narrow mobile viewport and a desktop viewport.

**Decisions**

- Included in V1: one fixed location, current conditions, short hourly forecast, daily forecast, loading/error states, responsive layout
- Excluded from V1: location search, geolocation, backend, user accounts, persistence beyond simple client caching
- Recommended API choice: `Open-Meteo`, because it is frontend-friendly and does not require exposing a secret for this MVP
- Recommended scope control: use plain `fetch` first; only add a data library like TanStack Query if you want caching/retries beyond the basics

**Further Considerations**

1. Choose the fixed location now so the API query and display copy stay consistent from day one.
2. If you expect future multi-location support, keep the location config array-based even if it starts with one entry.
3. If visual polish is important, add weather icons and a day/night theme after the core weather data is already rendering correctly.
