import { useQuery } from "@tanstack/react-query";
import { client } from "../shared/api/client";
import { Pagination } from "../shared/ui/pagination/pagination";
import { useState } from "react";

export const Playlists = () => {
  const [page, setPage] = useState(1);
  const query = useQuery({
    staleTime: 10000,
    queryKey: ["playlists", page],
    queryFn: async () => {
      const response = await client.GET("/playlists", {
        params: {
          query: {
            pageNumber: page,
          },
        },
      });
      return response.data!;
    },
  });
  console.log("status", query.status);
  console.log("fetchStatus", query.fetchStatus);
  if (query.status === "pending") return <p>Loading ...</p>;
  return (
    <div>
      <Pagination
        pagesCount={query.data.meta.pagesCount}
        current={page}
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
