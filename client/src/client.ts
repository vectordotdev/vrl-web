import { VRL_WEB_SERVER_ADDRESS } from "./values";
import axios, { AxiosInstance } from "axios";
import { Event, Functions, Program } from "./state";

export type Success = {
  result: Event;
  output: any;
}

export type Error = {
  message: string;
}

export type Outcome = {
  success?: Success;
  error?: Error;
};

type Request = {
  event: Event;
  program: Program;
}

class Client {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: VRL_WEB_SERVER_ADDRESS,
    })
  }

  async get<T>(path: string): Promise<T> {
    return this.client.get(path)
  }

  async post<I, O>(path: string, request: I): Promise<O> {
    return this.post<I, O>(path, request)
  }

  async getFunctions(): Promise<Functions> {
    return this.get<Functions>('functions')
      .then(res => res.functions)
      .catch(e => e)
  }

  async resolve(request: Request): Promise<Outcome> {
    return this.post<Request, Outcome>('resolve', request)
      .then(res => res)
      .catch(e => e)
  }
}

export const client = new Client();