import { VRL_FUNCTIONS_ENDPOINT } from "./values";
import axios, { AxiosResponse } from "axios";
import { Event, Functions, Program } from "./state";

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

  async getFunctions(): Promise<Functions> {
    return axios.get(VRL_FUNCTIONS_ENDPOINT);
  }

  async resolve(request: Request): Promise<Outcome> {
    return await this.post<Request, Outcome>('resolve', request);
  }
}

export const client = new Client();