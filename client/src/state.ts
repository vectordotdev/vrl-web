import { SCENARIOS } from "./values"
import createStore from "zustand"
import { configurePersist } from "zustand-persist"

type Event = object

export type Scenario = {
  id: number
  title: string
  event: Event
}
export type AppState = {
  darkMode: boolean
  scenario: Scenario
  scenarios: Array<Scenario>

  toggleDarkMode: () => void
  setMode: () => void
  setScenario: (id: number) => void
}

const scenarios: Array<Scenario> = SCENARIOS

const darkModeUserPreference: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const { persist } = configurePersist({
  storage: localStorage,
  rootKey: "__vrl_playground"
})

export const state = createStore<AppState>(
  persist<AppState>({
    key: 'scenario',
  }, (set, get) => ({
    darkMode: darkModeUserPreference,
    scenario: scenarios[0],
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
    },
    setScenario: (id: number) => {
      set({ scenario: get().scenarios[id] })
    }
  }))
)