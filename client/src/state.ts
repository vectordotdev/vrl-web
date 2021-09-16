import { SCENARIOS } from "./values"

import create from "zustand"
import { persist } from "zustand/middleware"

type Event = object;

export type Scenario = {
  title: string
  event: Event
}

export type AppState = {
  darkMode: boolean
  scenario: Scenario

  toggleDarkMode: () => void
  setMode: () => void
}

const scenarios: Array<Scenario> = SCENARIOS;
const defaultScenario: Scenario = scenarios[0];

const darkModeUserPreference: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const initialState = {
  darkMode: darkModeUserPreference
}

export const useStore = create<AppState>(persist<AppState>(
  (set, get) => ({
    darkMode: darkModeUserPreference,
    scenario: defaultScenario,

    toggleDarkMode: () => {
      set({ darkMode: !get().darkMode })
      get().setMode();
    },
    setMode: () => {
      if (get().darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }),
  {
    name: "__vrl_playground",
    getStorage: () => sessionStorage,
  }
))