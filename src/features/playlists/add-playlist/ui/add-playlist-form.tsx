import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SchemaCreatePlaylistRequestPayload } from "../../../../shared/api/schema.ts";
import { client } from "../../../../shared/api/client.ts";

export const AddPlaylistForm = () => {
  const { register, handleSubmit } =
    useForm<SchemaCreatePlaylistRequestPayload>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: SchemaCreatePlaylistRequestPayload) => {
      const response = await client.POST("/playlists", {
        body: data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
      });
    },
  });

  const onSubmit = (data: SchemaCreatePlaylistRequestPayload) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add New Playlist</h2>
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
