import https from "node:https";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const fetcher = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

interface ITokenPayload {
  id_user: string;
  kategori_pengguna: string;
  id_group_user: string;
  terdaftar_telegram: boolean;
  shift: string;
  nama_user: string;
  flags_biodata: number;
  exp: number;
  token_version: number;
}

export class API_MyUNPAM {
  constructor(private baseUrl: string, private token: string) {}

  private fetchTo = async (endpoint: string, options?: AxiosRequestConfig) => {
    return await fetcher(`${this.baseUrl}${endpoint}`, options);
  };

  public getTokenPayloadDecoded = () => {
    const tokenPayload = this.token.split(".")[1];
    const payload = JSON.parse(atob(tokenPayload)) as ITokenPayload;

    return payload;
  };

  public requestPresensiLoginToken = async () => {
    const tokenPayload = this.getTokenPayloadDecoded();

    try {
      return await this.fetchTo(
        `/api/portal/aplikasi/login?app_code=PRESENSI&username=${tokenPayload.id_user}`,
        {
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

  public login = async (username: string, password: string) => {
    try {
      return await this.fetchTo("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ username: username, password: password }),
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
          return {
            status: {
              success: true,
            },
            data: responseData,
          };
        }
      });
    } catch (e) {
      if (e instanceof AxiosError)
        return {
          status: {
            success: false,
            message: e.response.data.message,
          },
        };
    }
  };
}
