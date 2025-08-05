import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { client } from "../shared/api/client";
import { Pagination } from "../shared/ui/pagination/pagination";
import { useState } from "react";

type Props = {
  userId?: string;
};

export const Playlists = ({ userId }: Props) => {
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
          <li key={playlist.id}>{playlist.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};
