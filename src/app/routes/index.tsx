import { createFileRoute } from "@tanstack/react-router";
import { PlayListPage } from "../../pages/playlists-page";

export const Route = createFileRoute("/")({
  component: PlayListPage,
});
