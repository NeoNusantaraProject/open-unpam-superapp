import { defineMiddleware } from "astro:middleware";
import { APIProvider, initAPI } from "./utilities/apiprovider";

export interface ITokenPayload {
  id_user: string;
  id_group_user: string;
  nama_user: string;
  shift: string;
  exp: number;
}

const getTokenPayloadDecoded = (token: string) => {
  const tokenPayload = token.split(".")[1];
  const payload = JSON.parse(atob(tokenPayload)) as ITokenPayload;

  return payload;
};

export const onRequest = defineMiddleware(async (context, next) => {
  const MyUNPAMToken = context.cookies.get("my_unpam_token");

  let api = initAPI({
    myUNPAMToken: MyUNPAMToken?.value as string,
  });

  if (context.url.pathname.startsWith("/dashboard")) {
    if (!MyUNPAMToken) return context.redirect("/login");
    if (MyUNPAMToken.value == "" || MyUNPAMToken.value == null) {
      context.cookies.delete("my_unpam_token");
      return context.redirect("/login");
    }
  }
  return next();
});
