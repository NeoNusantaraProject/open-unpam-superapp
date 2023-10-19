import type { APIRoute } from "astro";
import https from "node:https";
import axios, { AxiosError } from "axios";

const fetcher = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const urlParams = new URL(request.url).searchParams;

    const authToken = request.headers.get("Authorization");
    const data = await fetcher.get(
      `https://my.unpam.ac.id/api/ujian/${urlParams.get(
        "examtype"
      )}/cetak?semester=${urlParams.get(
        "semester"
      )}&jenis_ujian=${urlParams.get("examtype")}`,
      {
        method: "GET",
        headers: {
          Authorization: authToken,
          Accept: "application/pdf",
        },
        responseType: "arraybuffer",
      }
    );

    return new Response(Buffer.from(data.data, "binary"), {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (e) {
    if (e instanceof AxiosError) {
      return new Response(
        JSON.stringify({
          status: {
            success: false,
            message: e.message,
          },
        })
      );
    }
  }
};
