import { useLoginMutation } from "../api/use-login-mutation";

export const LoginButton = () => {
  const mutation = useLoginMutation();

  const handleLoginClick = () => {
    window.addEventListener("message", handleOathMessage);

    window.open(
      `https://musicfun.it-incubator.app/api/1.0/auth/oauth-redirect?callbackUrl=${callbackUrl}`,
      "apihub-oauth2",
      "width=500, height=600"
    );
    // mutation.mutate({ code: "????" });  by defautlt query goes automatically but mutation we have to trigger ourself
  };

  const handleOathMessage = (event: MessageEvent) => {
    window.removeEventListener("message", handleOathMessage);
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

  return <button onClick={handleLoginClick}>Login with ApiHUB</button>;
};
