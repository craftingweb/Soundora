import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../../shared/api/client.ts";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (playlistId: string) => {
      const response = await client.DELETE(`/playlists/{playlistId}`, {
        params: { path: playlistId },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
        refetchType: "all",
      });
    },
  });
};
