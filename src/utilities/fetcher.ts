import https from "node:https";
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

interface IRequestProxyAPIConfig {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  to: string;
  headers: {
    [keys: string]: string;
  };
}

export type FetchAdapter = "Axios" | "ProxyFetchAPI";

export class Fetcher {
  private axiosFetcher: AxiosInstance;

  constructor(
    private baseUrl: string,
    private adapter: FetchAdapter = "Axios"
  ) {
    if (adapter == "Axios")
      this.axiosFetcher = axios.create({
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });
  }
  public fetchTo = async (
    endpoint: string,
    options?: AxiosRequestConfig | IRequestProxyAPIConfig
  ) => {
    switch (this.adapter) {
      case "Axios":
        return await this.axiosFetcher(
          `${this.baseUrl}${endpoint}`,
          options as AxiosRequestConfig
        );
      case "ProxyFetchAPI":
        return await fetch(`/api/proxyrequest`, {
          method: "POST",
          body: JSON.stringify({
            method: options.method,
            headers: options.headers,
            to: `${this.baseUrl}${endpoint}`,
          }),
        }).then(async (e) => {
          const data = await e.json();
          const status = e.status;
          return { data, status };
        });
    }
  };

  // public init = () => {
  //   switch (this.adapter) {
  //     case "Axios":
  //       return {
  //         fetchTo: async (endpoint: string, options?: AxiosRequestConfig) =>
  //           await axiosFetcher(
  //             `${this.baseUrl}${endpoint}`,
  //             options as AxiosRequestConfig
  //           ),
  //       };
  //     case "ProxyFetchAPI":
  //       return {
  //         fetch: async (options: IRequestProxyAPIConfig) =>
  //           await fetch(`/api/proxyrequest`, {
  //             method: "POST",
  //             body: JSON.stringify(options),
  //           }),
  //       };
  //   }
  // };
}
