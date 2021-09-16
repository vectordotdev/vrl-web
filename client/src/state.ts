import { SCENARIOS, VRL_WEB_SERVER_ADDRESS } from "./values";
import createStore, { GetState, SetState, UseStore } from "zustand";
import { configurePersist } from "zustand-persist";
import { client, Outcome } from "./client";
import axios from "axios";

export type Event = object
export type Program = string
export type Output = string

export type Scenario = {
  id: number
  title: string
  event: Event
  program: Program
  result?: Event | null
  output?: Output | null
  errorMsg?: string | null
}

export type Functions = {
  functions: string[]
}

type Globals = {
  darkMode: boolean
  functions: string[]
  toggleDarkMode: () => void
  setMode: () => void
  setFunctions: () => void
}

type Persistent = {
  id: number
  title: string
  event: Event
  program: Program
  result?: Event | null;
  output?: Output | null;
  errorMsg?: string | null;

  scenario: Scenario;
  scenarios: Scenario[];

  setScenario: (id: number) => void;
  resolve: () => void;
  resetOutcome: () => void;
}

const scenarios: Scenario[] = SCENARIOS;

const darkModeUserPreference: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const { persist } = configurePersist({
  storage: localStorage,
  rootKey: "__vrl_playground"
})

export const globals = createStore<Globals>(
  persist<Globals>({
    key: 'globals',
  }, (set: SetState<Globals>, get: GetState<Globals>) => ({
    darkMode: darkModeUserPreference,
    functions: [],

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

    setFunctions: () => {
      client.getFunctions()
        .then(res => set({ functions: res.functions }))
    }
  }))
)

const defaultScenario: Scenario = scenarios[0];

export const state: UseStore<Persistent> = createStore<Persistent>(
  persist<Persistent>({
    key: 'scenario',
  }, (set: SetState<Persistent>, get: GetState<Persistent>) => ({
    id: defaultScenario.id,
    title: defaultScenario.title,
    event: defaultScenario.event,
    program: defaultScenario.program,
    result: null,
    output: null,
    errorMsg: null,
    scenario: scenarios[0],
    scenarios: scenarios,
  

    setScenario: (id: number) => {
      const s = get().scenarios[id];

      set({ id: s.id, title: s.title, event: s.event, program: s.program });
      get().resetOutcome();
    },

    resolve: () => {
      const request = {
        event: get().event,
        program: get().program,
      }

      axios.post(`${VRL_WEB_SERVER_ADDRESS}/resolve`, request)
        .then(res => {
          const outcome: Outcome = res.data;
          if (outcome.success) {
            const res = outcome.success;
            set({ result: res.result, output: res.output});
          } else if (outcome.error) {
            const res = outcome.error;
            set({ errorMsg: res.message });
          } else {
            console.error('something went wrong in the POST request');
          }
        });
    },

    resetOutcome: () => {
      set({ result: null, output: null });
    }
  }))
)