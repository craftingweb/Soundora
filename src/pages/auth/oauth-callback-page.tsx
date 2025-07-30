import { useEffect } from "react";

export function OAuthCallbackPage() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code && window.opener) {
      window.opener.postMessage({ code }, window.location.origin);
    }

    window.close();
  }, []);
  return (
    <>
      <h2>O Auth call back</h2>
    </>
  );
}
