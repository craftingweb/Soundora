import { Navigate } from "@tanstack/react-router";
import { useMeQuery } from "../features/auth/api/use-me-query";
import { AddPlaylistForm } from "../features/playlists/add-playlist/ui/add-playlist-form";
import { Playlists } from "../widgets/playlists/ui/playlists";
import { EditPlaylistForm } from "../features/playlists/edit-playlist/ui/edit-playlist-form";
import { useState } from "react";

export function MyPlaylistsPage() {
  const { data, isPending } = useMeQuery();
  const [editingPlaylist, setEditingPlaylist] = useState(null);

  if (isPending) return <div>Loading...</div>;

  if (!data) return <Navigate to="/" replace />;
  return (
    <>
      <h2>My Playlists</h2>
      <hr />
      <AddPlaylistForm />
      <hr />
      <Playlists
        userId={data?.userId}
        onPlaylistSelected={setEditingPlaylist}
      />
      <hr />

      <EditPlaylistForm playlistId={editingPlaylist} />
    </>
  );
}
