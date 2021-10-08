import { DarkModeConfig } from "use-dark-mode";

export const darkModeUserPreference: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const darkModeConfig: DarkModeConfig = {
  classNameDark: "dark",
};