import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { client } from "../../../shared/api/client";
import { Pagination } from "../../../shared/ui/pagination/pagination";
import { DeletePlaylist } from "../../../features/playlists/delete-playlist/ui/delete-playlist";

type Props = {
  userId?: string;
  onPlaylistSelected?: (playListId: string) => void;
};

export const Playlists = ({ userId, onPlaylistSelected }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const query = useQuery({
    staleTime: 10000,
    queryKey: ["playlists", { page, search, userId }],
    queryFn: async () => {
      const response = await client.GET("/playlists", {
        params: {
          query: {
            pageNumber: page,
            search,
            userId,
          },
        },
      });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
  console.log("status", query.status);
  console.log("fetchStatus", query.fetchStatus);

  const handleSelectPlaylistClick = (playlistId: string) => {
    onPlaylistSelected?.(playlistId);
  };

  if (query.status === "pending") return <p>Loading ...</p>;
  return (
    <div>
      <div>
        <input
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder={"search"}
        />
      </div>
      <Pagination
        pagesCount={query.data?.meta.pagesCount}
        currentPage={page}
        onPageNumberChange={setPage}
        isFetching={query.isFetching}
      />

      <ul>
        {query.data?.data.map((playlist) => (
          <li
            key={playlist.id}
            onClick={() => handleSelectPlaylistClick(playlist.id)}
          >
            {playlist.attributes.title}
            <DeletePlaylist playlistId={playlist.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
