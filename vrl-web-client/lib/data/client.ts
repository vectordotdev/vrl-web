import axios, { AxiosResponse } from "axios";
import { Event, Program } from "./state";
import { VrlFunction } from "./vrl";

const vrlResolveEndpoint: string = `${process.env.VRL_WEB_SERVER_ADDRESS}/resolve`;
const vrlFunctionInfoEndpoint: string = `${process.env.VRL_INFO_SERVER_ADDRESS}/functions`;

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
    return await this.post<Request, AxiosResponse>(vrlResolveEndpoint, request)
      .then(res => res.data);
  }

  async getVrlInfo(): Promise<VrlFunction[]> {
    return await this.get<VrlFunction[], AxiosResponse<VrlFunction[]>>(vrlFunctionInfoEndpoint)
      .then(res => res.data);
  }
}

export const client = new Client();