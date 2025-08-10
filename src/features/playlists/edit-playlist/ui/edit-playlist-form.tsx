import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SchemaUpdatePlaylistRequestPayload } from "../../../../shared/api/schema.ts";
import { client } from "../../../../shared/api/client.ts";

type Props = {
  playlistId: string;
};

export const EditPlaylistForm = ({ playlistId }: Props) => {
  const { register, handleSubmit } =
    useForm<SchemaUpdatePlaylistRequestPayload>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: SchemaUpdatePlaylistRequestPayload) => {
      const response = await client.PUT("/playlists/{playlistId}", {
        params: { path: playlistId },
        body: { ...data, tagIds: [] },
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

  const onSubmit = (data: SchemaUpdatePlaylistRequestPayload) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Playlist</h2>
      <p>
        <input {...register("title")} />
      </p>
      <p>
        <textarea {...register("description")}></textarea>
      </p>
      <button type="submit">Create</button>
    </form>
  );
};
