import type { AstroCookies } from "astro";
import { API_Local } from "./apis/local";
import { API_MyUNPAM } from "./apis/myunpam";
import { API_Presensi } from "./apis/presensi";
import type { FetchAdapter } from "./fetcher";

export class APIProvider {
  public myunpam: API_MyUNPAM;
  public presensi: API_Presensi;
  public local: API_Local;
  constructor(private myUNPAMToken: string, adapter: FetchAdapter) {
    this.myunpam = new API_MyUNPAM(
      import.meta.env.PUBLIC_MYUNPAM_ENDPOINT,
      this.myUNPAMToken,
      adapter
    );
    this.local = new API_Local(import.meta.env.PUBLIC_LOCAL_ENDPOINT, adapter);
  }
}

export const initAPI = (
  tokens: { myUNPAMToken: string },
  adapter: FetchAdapter = "Axios"
) => {
  return new APIProvider(tokens.myUNPAMToken as string, adapter);
};
