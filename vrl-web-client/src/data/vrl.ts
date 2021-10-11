import { GetState, SetState, StateCreator } from "zustand";
import { client } from "./client";
import { LocalStorage } from "./storage";

export type Example = {
  title: string;
  source: string;
}

export type Parameter = {
  name: string;
  kind: string;
  required: boolean;
}

export type VrlFunction = {
  name: string;
  parameters: Parameter[];
  examples: Example[];
}

type VrlInfo = {
  functions: VrlFunction[];
  showFunctions: boolean;
  setVrlInfo: () => void;
  setFunctions: () => void;
  toggleShowFunctions: () => void;
}

const vrlInfoHandler: StateCreator<VrlInfo> = (set: SetState<VrlInfo>, get: GetState<VrlInfo>) => ({
  functions: null,
  showFunctions: false,

  setVrlInfo: () => {
    get().setFunctions();
  },

  setFunctions: () => {
    if (get().functions === null) {
      client.getVrlInfo()
        .then((functions: VrlFunction[]) => {
          console.log(functions);
          set({ functions });
        })
        .catch(e => { throw new Error(`Something went wrong when communicating with the server: ${e}`); });
    }
  },
  toggleShowFunctions: () => {
    set({ showFunctions: !get().showFunctions });
  }
});

export const vrlInfo = new LocalStorage("__vrl_info", vrlInfoHandler);