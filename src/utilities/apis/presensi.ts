export class API_Presensi {
  constructor(private baseUrl: string, private token: string) {}

  private fetchTo = async (endpoint: string, options?: RequestInit) => {
    return await fetch(`${this.baseUrl}${endpoint}`, options);
  };

  public getToken = async (loginToken: string) => {
    try {
      return await this.fetchTo("/api/portal/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: loginToken }),
      }).then(async (e) => {
        const responseData = await e.json();

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
          message: e.message,
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
        const responseData = await e.json();

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
          message: e.message,
        },
        e,
      };
    }
  };
}
