import { defineMiddleware } from "astro:middleware";
import { initAPI } from "./utilities/apiprovider";

interface ITokenPayload {
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
  const api = initAPI(context.cookies);
  const MyUNPAMToken = context.cookies.get("my_unpam_token");
  const PresensiToken = context.cookies.get("presensi_token");

  if (context.url.pathname.startsWith("/dashboard")) {
    if (!MyUNPAMToken) return context.redirect("/login");
    if (MyUNPAMToken.value == "" || MyUNPAMToken.value == null) {
      context.cookies.delete("my_unpam_token");
      return context.redirect("/login");
    }

    if (
      !PresensiToken ||
      PresensiToken.value == "" ||
      PresensiToken.value == null
    ) {
      const data = await api.myunpam.requestPresensiLoginToken();

      if (!data.status.success) return next();

      const tokenPresensi = await api.presensi.getToken(data.data.token);

      if (!tokenPresensi.status.success) return next();

      context.cookies.set("presensi_token", tokenPresensi.data.access_token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    } else {
      const tokenPayload = getTokenPayloadDecoded(PresensiToken.value);

      if (tokenPayload.exp < Date.now()) {
        context.cookies.delete("presensi_token");
        const data = await api.myunpam.requestPresensiLoginToken();

        if (!data.status.success) return next();

        const tokenPresensi = await api.presensi.getToken(data.data.token);

        if (!tokenPresensi.status.success) return next();

        context.cookies.set("presensi_token", tokenPresensi.data.access_token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
      }
    }
  }
  return next();
});
