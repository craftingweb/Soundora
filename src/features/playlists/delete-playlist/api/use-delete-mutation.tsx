import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../../shared/api/client.ts";
import type { SchemaGetPlaylistsOutput } from "../../../../shared/api/schema.ts";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (playlistId: string) => {
      const response = await client.DELETE(`/playlists/{playlistId}`, {
        params: { path: { playlistId } },
      });
      return response.data;
    },
    onSuccess: (_: undefined, playlistId: string) => {
      queryClient.setQueriesData<SchemaGetPlaylistsOutput>(
        { queryKey: ["playlists"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.filter(
              (p: { id: string; type: string; attributes: unknown }) =>
                p.id !== playlistId
            ),
          };
        }
      );
    },
  });
};
