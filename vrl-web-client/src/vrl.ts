import { GetState, SetState, StateCreator } from "zustand";
import { client } from "./client";
import { LocalStorage } from "./storage";

type Arg = {
  description: string;
  required: boolean;
}

declare type Args = { [name: string]: Arg }

export type VrlFunction = {
  description: string;
  category: string;
  arguments: Args;
}

export type VrlFunctions = { [key: string]: VrlFunction };

type VrlInfo = {
  functions: VrlFunctions | null;
  showFunctions: boolean;
  setFunctions: () => void;
  toggleShowFunctions: () => void;
}

export type VrlInfoFromServer = {
  vrl: VrlInfo;
}

const vrlInfoHandler: StateCreator<VrlInfo> = (set: SetState<VrlInfo>, get: GetState<VrlInfo>) => ({
  functions: null,
  showFunctions: false,

  setFunctions: () => {
    if (get().functions === null) {
      client.getVrlInfo()
        .then((info: VrlInfoFromServer) => {
          set({ functions: info.vrl.functions });
        })
        .catch(e => { throw new Error(`Something went wrong when communicating with the server: ${e}`); });
    }
  },
  toggleShowFunctions: () => {
    set({ showFunctions: !get().showFunctions });
  }
});

export const vrlInfo = new LocalStorage("__vrl_info", vrlInfoHandler);