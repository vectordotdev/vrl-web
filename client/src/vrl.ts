import { GetState, SetState, StateCreator } from "zustand";
import { client } from "./client";
import { LocalStorage } from "./storage";

type Arg = {
  description: string;
  required: boolean;
}

declare type Args = { [name: string]: Arg }

type VrlFunction = {
  description: string;
  category: string;
  arguments: Args;
}

export type VrlFunctions = { [key: string]: VrlFunction };

type VrlInfo = {
  functions: VrlFunctions | null;
  setFunctions: () => void;
}

const vrlInfoHandler: StateCreator<VrlInfo> = (set: SetState<VrlInfo>, get: GetState<VrlInfo>) => ({
  functions: null,

  setFunctions: () => {
    if (get().functions === null) {
      client.getVrlInfo()
        .then((functions: VrlFunctions) => {
          set({ functions });
        })
        .catch(e => { throw new Error(`Something went wrong when communicating with the server: ${e}`); });
    }
  }
});

export const vrlInfo = new LocalStorage("__vrl_info", vrlInfoHandler);