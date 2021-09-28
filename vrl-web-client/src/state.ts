import { SCENARIOS } from "./values";
import { GetState, SetState, StateCreator } from "zustand";
import { client, Outcome } from "./client";
import { darkModeUserPreference } from "./mode";
import { LocalStorage } from "./storage";

// Core types
export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
export type Event = Json;
export type Program = string;
export type Output = string;

// Used to construct scenario URLs
type Hashable = {
  title: string;
  event: Event | null;
  program: Program;
  result?: Event | null;
  output?: Output | null;
}

// The full "state" of the application
export type Scenario = {
  id: number;
  title: string;
  event: Event | null;
  program: Program;
  result?: Event | null;
  output?: Output | null;
  errorMsg?: string | null;
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
  theme: string;
  scenario: Scenario;
  scenarios: Scenario[];
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

  // Slide-out drawer
  drawer: boolean;
  toggleDrawer: () => void;
}

// Calculate initial defaults
const scenarios: Scenario[] = SCENARIOS;
const defaultScenario: Scenario = scenarios[0];
const defaultTheme: string = (darkModeUserPreference) ? "vs-dark" : "vs";
const defaultTitle: string = "My VRL scenario";

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

  drawer: false,
  toggleDrawer: () => {
    set({ drawer: !get().drawer });
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
    const event: Event = get().event || {};

    const request = {
      event,
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
        } else {
          throw new Error("The VRL web server returned a response that couldn't be interpreted");
        }
      })
      .catch(e => { throw new Error(`Something went wrong when communicating with the server: ${e}`); });
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
      title: get().title,
      event: get().event,
      program: get().program,
      output: get().output,
      result: get().result,
    };

    const s = JSON.stringify(input);
    const hash = window.btoa(s);
    const host = window.location.host;

    return `${host}/h/${hash}`;
  },
  setHashUrl: () => {
    const url = get().getHashUrl();

    set({ hashUrl: url });
  },
  setScenarioFromHash: (hash: string) => {
    const s: string = window.atob(hash);
    const obj: Hashable = JSON.parse(s);
    set({ title: obj.title, event: obj.event, program: obj.program, output: obj.output, result: obj.result });
  },
});

export const state = new LocalStorage("__vrl_playground", stateHandler);