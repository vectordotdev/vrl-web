import { HOST, SCENARIOS } from "./values";
import createStore, { GetState, SetState, StateCreator, UseStore } from "zustand";
import { persist } from "zustand/middleware";
import { client, Outcome } from "./client";
import { darkModeUserPreference } from "./mode";
import create from "zustand";

// Core storage abstractions
abstract class Store<T extends object> {
  store: UseStore<T>;

  constructor(store: UseStore<T>) {
    this.store = store;
  }
}

// Persistent data storage
class LocalStorage<T extends object> extends Store<T> {
  store: UseStore<T>;

  constructor(name: string, state: StateCreator<T>) {
    const local = persist<T>(state, { name, getStorage: () => localStorage });
    const store = create<T>(local);

    super(store);
  }
}

// Ephemeral data storage (not yet used)
class MemoryStorage<T extends object> extends Store<T> {
  store: UseStore<T>;

  constructor(state: StateCreator<T>) {
    const store = create<T>(state);

    super(store);
  }
}

// Ephemeral data storage (not yet used)
class SessionStorage<T extends object> extends Store<T> {
  store: UseStore<T>;

  constructor(name: string, state: StateCreator<T>) {
    const local = persist<T>(state, { name, getStorage: () => sessionStorage });
    const store = create<T>(local);

    super(store);
  }
}

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

// Declaration of application state management logic
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

// Calculate initial defaults
const scenarios: Scenario[] = SCENARIOS;
const defaultScenario: Scenario = scenarios[0];
const defaultTheme: string = (darkModeUserPreference) ? "vs-dark" : "vs";

// Getting/setting logic for all state
const stateHandler: StateCreator<Persistent> = (set: SetState<Persistent>, get: GetState<Persistent>) => ({
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
  setScenarioFromHash: (hash: string) => {
    const s: string = window.atob(hash);
    const obj: Hashable = JSON.parse(s);

    set({ event: obj.event, program: obj.program, output: obj.output, result: obj.result });
  },
});

export const state = new LocalStorage("__vrl_playground", stateHandler);