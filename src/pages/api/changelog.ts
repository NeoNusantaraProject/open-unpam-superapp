import type { APIRoute } from "astro";
import axios, { AxiosError } from "axios";
import NodeCache from "node-cache";

const nCache = new NodeCache();
const fetcher = axios.create();

export const GET: APIRoute = async ({ request }) => {
  try {
    const cacheData = nCache.get("changelog");
    if (!cacheData) {
      const APIResponse = await fetcher.get(
        "https://api.github.com/repos/AlfatArdiansa/unpam-superapp/commits",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.PUBLIC_TOKEN_GH}`,
          },
        }
      );

      if (APIResponse.status != 200)
        return new Response(
          JSON.stringify({
            status: {
              success: false,
              message: "GH API response is not good!",
            },
            data: APIResponse.data,
          })
        );

      nCache.set("changelog", APIResponse.data, 30);

      return new Response(
        JSON.stringify({
          status: {
            success: true,
          },
          data: APIResponse.data,
        })
      );
    }
    return new Response(
      JSON.stringify({
        status: {
          success: true,
        },
        data: cacheData,
      })
    );
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
