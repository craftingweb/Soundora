import { createRoot } from "react-dom/client";
import "../styles/reset.css";
import "../styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routeTree } from "../routes/routeTree.gen.ts";
import { createRouter, RouterProvider } from "@tanstack/react-router";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
