import type { AstroCookies } from "astro";
import { API_MyUNPAM } from "./apis/myunpam";
import { API_Presensi } from "./apis/presensi";

export class APIProvider {
  public myunpam: API_MyUNPAM;
  public presensi: API_Presensi;
  constructor(private myUNPAMToken: string, private presensiToken: string) {
    this.myunpam = new API_MyUNPAM(
      import.meta.env.PUBLIC_MYUNPAM_ENDPOINT,
      this.myUNPAMToken
    );
    this.presensi = new API_Presensi(
      import.meta.env.PUBLIC_PRESENSI_ENDPOINT,
      this.presensiToken
    );
  }
}

export const initAPI = (astroCookies: AstroCookies) => {
  const myUNPAMToken = astroCookies.get("my_unpam_token");
  const presensiToken = astroCookies.get("presensi_token");

  return new APIProvider(
    myUNPAMToken?.value as string,
    presensiToken?.value as string
  );
};
