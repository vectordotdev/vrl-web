import axios, { AxiosResponse } from "axios";

import { Event, Program } from "./state";
import { VRL_INFO_SERVER_ADDRESS, VRL_RESOLVE_ENDPOINT } from "./values";
import { VrlFunctions, VrlInfoFromServer } from "./vrl";

export type Success = {
  result: Event;
  output: any;
}

export type Outcome = {
  success?: Success;
  error?: string;
};

type Request = {
  event: Event;
  program: Program;
  timezoneOffset: number;
}

class Client {
  async get<T, R = AxiosResponse<T>>(url: string): Promise<R> {
    return await axios.get<T, R>(url);
  }

  async post<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
  ): Promise<R> {
    return await axios.post<T, R>(url, data);
  }

  async resolve(program: Program, event: Event): Promise<Outcome> {
    const timezoneOffset: number = new Date().getTimezoneOffset();

    const request: Request = { program, event, timezoneOffset };
    return await this.post<Request, AxiosResponse>(VRL_RESOLVE_ENDPOINT, request)
      .then(res => res.data);
  }

  async getVrlInfo(): Promise<VrlInfoFromServer> {
    return await this.get<VrlFunctions, AxiosResponse<VrlInfoFromServer>>(VRL_INFO_SERVER_ADDRESS)
      .then(res => res.data);
  }
}

export const client = new Client();