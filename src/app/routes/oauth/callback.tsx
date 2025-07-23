import { createFileRoute } from "@tanstack/react-router";
import { OAuthCallbackPage } from "../../../pages/auth/oauth-callback-page";

export const Route = createFileRoute("/oauth/callback")({
  component: OAuthCallbackPage,
});
