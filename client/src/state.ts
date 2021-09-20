import { HOST, SCENARIOS } from "./values";
import createStore, { GetState, SetState, UseStore } from "zustand";
import { configurePersist } from "zustand-persist";
import { client, Outcome } from "./client";
import { darkModeUserPreference } from "./mode";

// Local storage configuration
const { persist } = configurePersist({
  storage: localStorage,
  rootKey: "__vrl_playground"
});

// Core types
export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
export type Event = Json;
export type Program = string;
export type Output = string;

// Used to construct scenario URLs
type Hashable = {
  event: Event;
  program: Program;
  result?: Event | null;
  output?: Output | null;
}

// The full "state" of the application
export type Scenario = {
  id: number;
  title: string;
  event: Event;
  program: Program;
  result?: Event | null;
  output?: Output | null;
  errorMsg?: string | null;
}

// The list of VRL functions fetched from the server
export type Functions = {
  functions: string[];
}

type Persistent = {
  id: number;
  title: string;
  event: Event;
  program: Program;
  result?: Event | null;
  output?: Output | null;
  errorMsg?: string | null;
  hashUrl: string | null;

  functions: string[];
  theme: string;

  scenario: Scenario;
  scenarios: Scenario[];

  showFunctions: boolean;
  toggleShowFunctions: () => void;

  setFunctions: () => void;
  setTheme: (isLight: boolean) => void;
  removeError: () => void;
  setEvent: (s: string) => void;
  setProgram: (s: string) => void;
  getHashUrl: () => string;
  setHashUrl: () => void;
  setScenario: (id: number) => void;
  resolve: () => void;
  resetOutcome: () => void;
  setScenarioFromHash: (hash: string) => void;
  setTitle: (title: string) => void;
}

const scenarios: Scenario[] = SCENARIOS;

const defaultScenario: Scenario = scenarios[0];

const defaultTheme: string = (darkModeUserPreference) ? "vs-dark" : "vs";

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
    hashUrl: null,
    functions: [],
    theme: defaultTheme,
    showFunctions: false,

    toggleShowFunctions: () => {
      set({ showFunctions: !get().showFunctions });
    },

    setFunctions: () => {
      if (get().functions.length === 0) {
        client.getFunctions()
          .then(res => {
            set({ functions: res.functions });
          })
      }
    },

    setTheme: (isLight: boolean) => {
      set({ theme: isLight ? "vs" : "vs-dark" });
    },

    setTitle: (title: string) => {
      set({ title });
    },

    setScenario: (id: number) => {
      const s = get().scenarios[id];

      set({ id: s.id, title: s.title, event: s.event, program: s.program });
      get().resetOutcome();
      get().setHashUrl();
    },

    removeError: () => {
      set({ errorMsg: null });
    },

    resolve: () => {
      const request = {
        event: get().event,
        program: get().program,
      }

      client.resolve(request)
        .then((outcome: Outcome) => {
          if (outcome.success) {
            const { output, result } = outcome.success;
            set({ output, result });
            set({ errorMsg: null });
          } else if (outcome.error) {
            set({ errorMsg: outcome.error });
            set({ output: null, result: null });
          }
        });
    },

    resetOutcome: () => {
      set({ result: null, output: null, errorMsg: null });
    },

    setEvent: (s: string) => {
      const event: Event = JSON.parse(s);
      set({ event });
    },

    setProgram: (s: string) => {
      set({ program: s });
    },

    getHashUrl: () => {
      const input: Hashable = {
        event: get().event,
        program: get().program,
        output: get().output,
        result: get().result,
      };

      const s = JSON.stringify(input);
      const hash = window.btoa(s);

      return `${HOST}/h/${hash}`;
    },

    setHashUrl: () => {
      const url = get().getHashUrl();
      
      set({ hashUrl: url });
    },

    setScenarioFromHash: (hash: string)  => {
      const s: string = window.atob(hash);
      const obj: Hashable = JSON.parse(s);

      set({ event: obj.event, program: obj.program, output: obj.output, result: obj.result });
    },
  }))
)