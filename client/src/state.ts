import { SCENARIOS } from "./values"
import createStore from "zustand"
import { configurePersist } from "zustand-persist"

export type Event = object

export type Program = string

export type Scenario = {
  id: number
  title: string
  event: Event
  program: Program
}

export type AppState = {
  darkMode: boolean
  scenario: Scenario
  scenarios: Array<Scenario>

  // Getters  
  event: () => Event
  program: () => Program

  // Setters
  toggleDarkMode: () => void
  setScenario: (id: number) => void

  // Methods with side effects
  setMode: () => void
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
    
    event: () => get().scenario.event,
    program: () => get().scenario.program,

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