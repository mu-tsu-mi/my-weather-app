# My Weather App

## Weather Code

0–1: Clear
2: partly cloudy
3: cloudy
(20 - 29: Precipitation and fog.)
45, 48: Fog or freezing fog.
(50 - 59: Drizzle, 60 - 69: Rain, 70 - 79: Snow, 80 - 90: Showers, 91 - 99: Thunderstorms)
51, 53, 55: Drizzle (light, moderate, heavy).
56, 57: Freezing drizzle (light, dense).
61, 63, 65: Rain (slight, moderate, heavy).
66, 67: Freezing rain (light, heavy).
71, 73, 75: Snow (slight, moderate, heavy).
85, 86: Snow showers (light, heavy).
95: Thunderstorm (slight/moderate).
96, 99: Thunderstorm with hail (slight/heavy)

### Many thanks to Noun Project

https://thenounproject.com/icon/sun-1108413/
https://thenounproject.com/icon/sunny-8277109/
https://thenounproject.com/icon/cloudy-8343643/
https://thenounproject.com/icon/drizzle-4377915/?utm_source=nounproject&utm_campaign=icon_match&utm_content=match_drawer
https://thenounproject.com/icon/drizzling-6514234/
https://thenounproject.com/icon/rain-umbrella-8311570/?utm_source=nounproject&utm_campaign=icon_match&utm_content=match_drawer
https://thenounproject.com/icon/storm-8177770/

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
