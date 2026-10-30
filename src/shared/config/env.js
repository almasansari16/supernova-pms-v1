/* Single access point for build-time environment variables.
   Nothing else in the app should read import.meta.env directly. */
const raw = import.meta.env;

export const env = Object.freeze({
  appName:    raw.VITE_APP_NAME    || "SuperNova PSMS",
  appVersion: raw.VITE_APP_VERSION || "1.0",
  apiBaseUrl: raw.VITE_API_BASE_URL || "",
  useMock:    (raw.VITE_USE_MOCK ?? "true") !== "false",
  isDev:      raw.DEV,
});
