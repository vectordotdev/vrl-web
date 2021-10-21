import { GetState, SetState, StateCreator } from "zustand";
import { client, Outcome } from "./client";
import { scenarios } from './scenarios';
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
  output?: Output | null;
}

// The full "state" of the application
export type Scenario = {
  id: number;
  title: string;
  event: Event | null;
  program: Program;
  output?: Output | null;
  errorMsg?: string | null;
}

// Declaration of application state management logic
type Persistent = {
  id: number;
  title: string;
  event: Event;
  program: Program;
  output?: Output | null;
  errorMsg?: string | null;
  hashUrl: string | null;
  scenario: Scenario;
  scenarios: Scenario[];
  setScenario: (id: number) => void;
  removeEvent: () => void
  setEvent: (s: string) => void;
  setTitle: (title: string) => void;
  setProgram: (s: string) => void;
  getHashUrl: () => string;
  setHashUrl: () => void;
  resetOutcome: () => void;
  resolve: () => void;
  setScenarioFromHash: (hash: string) => void;
}

// Calculate initial defaults
const defaultScenario: Scenario = scenarios[0];

// Getting/setting logic for all state
const stateHandler: StateCreator<Persistent> = (set: SetState<Persistent>, get: GetState<Persistent>) => ({
  id: defaultScenario.id,
  title: defaultScenario.title,
  event: defaultScenario.event,
  program: defaultScenario.program,
  output: null,
  errorMsg: null,
  scenario: scenarios[0],
  scenarios: scenarios,
  hashUrl: null,
  functions: [],
  showFunctions: false,
  setScenario: (id: number) => {
    const s = get().scenarios[id];

    set({ id: s.id, title: s.title, event: s.event, program: s.program });
    get().resetOutcome();
    get().setHashUrl();
  },
  removeEvent: () => {
    set({ event: null });
  },
  setEvent: (s: string) => {
    const event: Event = JSON.parse(s);
    set({ event });
  },
  setTitle: (title: string) => {
    set({ title });
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
  resetOutcome: () => {
    set({ output: null, errorMsg: null });
  },
  resolve: () => {
    const event: Event = get().event;
    const program: Program = get().program;

    client.resolve(program, event)
      .then((outcome: Outcome) => {
        if (outcome.success) {
          const { output, result } = outcome.success;

          const msg: string = `# Successfully resolved!\n# Enter a new program to act upon the new event`;

          set({ output, event: result, program: msg });
          set({ errorMsg: null });
        } else if (outcome.error) {
          set({ errorMsg: outcome.error });
          set({ output: null });
        } else {
          throw new Error("The VRL web server returned a response that couldn't be interpreted");
        }
      })
      .catch(e => { throw new Error(`Something went wrong when communicating with the server: ${e}`); });
  },
  setScenarioFromHash: (hash: string) => {
    const s: string = window.atob(hash);
    const obj: Hashable = JSON.parse(s);
    set({ title: obj.title, event: obj.event, program: obj.program, output: obj.output, errorMsg: null });
  },
});

export const state = new LocalStorage("__vrl_playground", stateHandler);