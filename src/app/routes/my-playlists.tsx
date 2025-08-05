import { createFileRoute } from "@tanstack/react-router";
import { MyPlaylistsPage } from "../../pages/my-playlists-page";

export const Route = createFileRoute("/my-playlists")({
  component: MyPlaylistsPage,
});
