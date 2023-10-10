import { defineMiddleware } from "astro:middleware";
import { initAPI } from "./utilities/apiprovider";

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

      console.log([data, tokenPresensi]);
      context.cookies.set("presensi_token", tokenPresensi.data.access_token);
    }
  }

  return next();
});
