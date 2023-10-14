import type { APIRoute } from "astro";
import https from "node:https";
import axios, { AxiosError } from "axios";

const fetcher = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const POST: APIRoute = async ({ params, request }) => {
  const { method, to, headers, body } = await request.json();

  try {
    const data = await fetcher.get(to, {
      method,
      headers,
      data: body,
    });

    return new Response(JSON.stringify(data.data));
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
