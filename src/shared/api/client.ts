import createClient from "openapi-fetch";
import type { paths } from "./schema";

const authMiddleware: Middleware = {
  async onRequest({ request, options }) {
    const accessToken = localStorage.getItem("musicfun-access-token");

    if (accessToken) {
      request.headers.set("Authorization", "Bearer " + accessToken);
    }

    return request;
  },
};

export const client = createClient<paths>({
  baseUrl: "https://musicfun.it-incubator.app/api/1.0/",
  headers: {
    "api-key": import.meta.env.VITE_API_KEY,
  },
});

client.use(authMiddleware);
