import { useMutation } from "@tanstack/react-query";
import { client } from "../../../shared/api/client";
import { useEffect } from "react";

export const LoginButton = () => {
  const mutation = useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const response = await client.POST("/auth/login", {
        body: {
          code: code,
          redirectUri: "???",
          rememberMe: true,
          accessTokenTTL: "1d",
        },
      });
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
  });
  const handleLoginClick = () => {
    const callbackUrl = "http://localhost:5173/oauth/callback";

    window.open(
      `https://musicfun.it-incubator.app/api/1.0/auth/oauth-redirect?callbackUrl=${callbackUrl}`,
      "apihub-oauth2",
      "width=500, height=600"
    );
    // mutation.mutate({ code: "????" });  by defautlt query goes automatically but mutation we have to trigger ourself
  };

  const handleOathMessage = (event: MessageEvent) => {
    if (event.origin !== document.location.origin) {
      console.warn("no match");
      return;
    }
    const code = event.data.code;
    if (!code) {
      console.warn("no message");
      return;
    }
    mutation.mutate({ code });
  };

  useEffect(() => {
    window.addEventListener("message", handleOathMessage);
    return () => {
      window.removeEventListener("message", handleOathMessage);
    };
  }, []);

  return <button onClick={handleLoginClick}>Login with ApiHUB</button>;
};
