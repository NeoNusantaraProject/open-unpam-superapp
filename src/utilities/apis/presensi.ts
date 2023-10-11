import https from "node:https";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const fetcher = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export class API_Presensi {
  constructor(private baseUrl: string, private token: string) {}

  private fetchTo = async (endpoint: string, options?: AxiosRequestConfig) => {
    return await fetcher(`${this.baseUrl}${endpoint}`, options);
  };

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
      return await this.fetchTo("/api/mahasiswa/jadwal-kuliah", {
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
        `/api/mahasiswa/jadwal-pertemuan/${idMatkul}/${idKelas}`,
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
