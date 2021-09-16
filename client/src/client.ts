import { VRL_WEB_SERVER_ADDRESS } from "./values";
import axios, { AxiosInstance } from "axios";
import { Event, Functions, Program } from "./state";

export type Success = {
  result: Event;
  output: any;
}

export type Error = string;

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

  async resolve(request: Request): Promise<Outcome> {
    return this.client.post<Request, Outcome>('resolve', request)
      .then(res => res)
      .catch(e => e)
  }
}

export const client = new Client();