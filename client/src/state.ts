import { HOST, SCENARIOS, VRL_WEB_SERVER_ADDRESS } from "./values";
import createStore, { GetState, SetState, UseStore } from "zustand";
import { configurePersist } from "zustand-persist";
import { Outcome } from "./client";
import axios from "axios";
import { darkModeUserPreference } from "./mode";

export type Event = object;
export type Program = string;
export type Output = string;

type Hashable = {
  event: Event;
  program: Program;
  result?: Event | null;
  output?: Output | null;
}

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

type Persistent = {
  id: number
  title: string
  event: Event
  program: Program
  result?: Event | null;
  output?: Output | null;
  errorMsg?: string | null;
  hashUrl: string | null;

  functions: string[];
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
}

type Ephemeral = {
  event: Event;
  program: Program;

  setEvent: (e: Event) => void;
  setProgram: (p: Program) => void;
  diff: (e: Event, p: Program) => boolean;
}

export const ephemeral: UseStore<Ephemeral> = createStore<Ephemeral>((set: SetState<Ephemeral>, get: GetState<Ephemeral>) => ({
  event: {},
  program: "",

  setEvent: (event: Event) => {
    set({ event });
  },

  setProgram: (program: Program) => {
    set({ program });
  },

  diff: (e: Event, p: Program) => {
    return e == get().event && p == get().program;
  }
}));

const scenarios: Scenario[] = SCENARIOS;

const defaultScenario: Scenario = scenarios[0];

const { persist } = configurePersist({
  storage: localStorage,
  rootKey: "__vrl_playground"
})

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
    theme: (darkModeUserPreference) ? "vs-dark" : "vs",

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

      axios.post(`${VRL_WEB_SERVER_ADDRESS}/resolve`, request)
        .then(res => {
          const outcome: Outcome = res.data;
          if (outcome.success) {
            const res = outcome.success;
            set({ result: res.result, output: res.output});
            get().setHashUrl();
            get().removeError();
          } else if (outcome.error) {
            set({ errorMsg: outcome.error });
          } else {
            console.error('something went wrong in the POST request');
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
      const hash = btoa(s);

      return `${HOST}/h/${hash}`;
    },

    setHashUrl: () => {
      const url = get().getHashUrl();
      
      set({ hashUrl: url });
    },

    setScenarioFromHash: (hash: string)  => {
      const s: string = atob(hash);
      const obj: Hashable = JSON.parse(s);

      set({ event: obj.event, program: obj.program, output: obj.output, result: obj.result });
    },
  }))
)