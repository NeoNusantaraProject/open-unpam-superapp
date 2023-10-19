import { Fetcher, type FetchAdapter } from "../fetcher";

export class API_Local extends Fetcher {
  constructor(baseUrl: string, adapter: FetchAdapter) {
    super(baseUrl, adapter);
  }

  public changelog = async () => {
    const data = await this.fetchTo("/api/changelog");

    return data;
  };
}
