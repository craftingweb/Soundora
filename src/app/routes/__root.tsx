import { createRootRoute } from "@tanstack/react-router";
import { Rootlayout } from "../layouts/root-layout";

export const Route = createRootRoute({
  component: Rootlayout,
});
