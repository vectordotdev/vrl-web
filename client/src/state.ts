import { SCENARIOS } from "./values"
import createStore from "zustand"
import { configurePersist } from "zustand-persist"

type Event = object

export type Scenario = {
  title: string
  event: Event
}

export type AppState = {
  darkMode: boolean
  scenario: Scenario
  scenarios: Array<Scenario>

  toggleDarkMode: () => void
  setMode: () => void
}

const scenarios: Array<Scenario> = SCENARIOS
const defaultScenario: Scenario = scenarios[0]

const darkModeUserPreference: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const initialState = {
  darkMode: darkModeUserPreference
}

const { persist } = configurePersist({
  storage: localStorage,
  rootKey: "__vrl_playground"
})

export const state = createStore<AppState>(
  persist<AppState>({
    key: 'scenario',
  }, (set, get) => ({
    darkMode: darkModeUserPreference,
    scenario: defaultScenario,
    scenarios: scenarios,

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
  }))
)