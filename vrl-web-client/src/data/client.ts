import axios, { AxiosResponse } from "axios";

import { Event, Program } from "./state";
import { VRL_FUNCTION_INFO_ENDPOINT, VRL_RESOLVE_ENDPOINT } from "./values";
import { VrlFunction } from "./vrl";

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
  tz: string;
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
    const tz: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const request: Request = { program, event, tz };
    return await this.post<Request, AxiosResponse>(VRL_RESOLVE_ENDPOINT, request)
      .then(res => res.data);
  }

  async getVrlInfo(): Promise<VrlFunction[]> {
    return await this.get<VrlFunction[], AxiosResponse<VrlFunction[]>>(VRL_FUNCTION_INFO_ENDPOINT)
      .then(res => res.data);
  }
}

export const client = new Client();