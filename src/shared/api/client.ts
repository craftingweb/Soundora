import createClient from "openapi-fetch";
import type { paths } from "./schema";

const authMiddleware: Middleware = {
  onRequest({ request }) {
    const accessToken = localStorage.getItem("musicfun-access-token");

    if (accessToken) {
      request.headers.set("Authorization", "Bearer " + accessToken);
    }

    return request;
  },
  onResponse({ response }) {
    if (!response.ok) {
      // Will produce error messages like "https://example.org/api/v1/example: 404 Not Found".
      throw new Error(
        `${response.url}: ${response.status} ${response.statusText}`
      );
    }
  },
};

export const client = createClient<paths>({
  baseUrl: "https://musicfun.it-incubator.app/api/1.0/",
  headers: {
    "api-key": import.meta.env.VITE_API_KEY,
  },
});

client.use(authMiddleware);
