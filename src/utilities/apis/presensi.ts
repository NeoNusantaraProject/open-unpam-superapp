import { Fetcher, type FetchAdapter } from "../fetcher";

import { type ITokenPayload } from "../../middleware";

export class API_Presensi extends Fetcher {
  constructor(baseUrl: string, private token: string, adapter: FetchAdapter) {
    super(baseUrl, adapter);
  }

  public getToken = async (loginToken: string) => {
    try {
      return await this.fetchTo("/api/portal/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ token: loginToken }),
      }).then(async (e) => {
        const responseData = await e.data;

        if (e.status != 200) {
          return {
            status: {
              success: false,
              message: responseData.message,
            },
          };
        } else {
          this.token = responseData.access_token;

          return {
            status: {
              success: true,
            },
            data: responseData,
          };
        }
      });
    } catch (e) {
      return {
        status: {
          success: false,
          message: e.response.data.message,
        },
      };
    }
  };
  public getJadwalKuliah = async () => {
    try {
      return await this.fetchTo("/api/presensi/mahasiswa/jadwal-kuliah", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(async (e) => {
        const responseData = await e.data;

        if (e.status != 200) {
          return {
            status: {
              success: false,
              message: responseData.message,
            },
          };
        } else {
          this.token = responseData.access_token;

          return {
            status: {
              success: true,
            },
            data: responseData,
          };
        }
      });
    } catch (e) {
      return {
        status: {
          success: false,
          message: e.response.data.message,
        },
      };
    }
  };
  public getMatkulPresensi = async (idMatkul: string, idKelas: string) => {
    try {
      return await this.fetchTo(
        `/api/presensi/mahasiswa/jadwal-pertemuan/${idMatkul}/${idKelas}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      ).then(async (e) => {
        const responseData = await e.data;

        if (e.status != 200) {
          return {
            status: {
              success: false,
              message: responseData.message,
            },
          };
        } else {
          this.token = responseData.access_token;

          return {
            status: {
              success: true,
            },
            data: responseData,
          };
        }
      });
    } catch (e) {
      return {
        status: {
          success: false,
          message: e.response.data.message,
        },
      };
    }
  };
}
