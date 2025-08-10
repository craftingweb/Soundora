import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SchemaUpdatePlaylistRequestPayload } from "../../../../shared/api/schema.ts";
import { client } from "../../../../shared/api/client.ts";

type Props = {
  playlistId: string;
};

export const EditPlaylistForm = ({ playlistId }: Props) => {
  const { register, handleSubmit } =
    useForm<SchemaUpdatePlaylistRequestPayload>();

  const { data, isPending, isError } = useQuery<string | null>({
    queryKey: ["playlists", playlistId],
    queryFn: async () => {
      const response = await client.GET(`/playlists/{playlistId}`, {
        params: { path: { playlistId } },
      });
      return response.data!;
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: SchemaUpdatePlaylistRequestPayload) => {
      const response = await client.PUT(`/playlists/{playlistId}`, {
        params: { path: { playlistId } },
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

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Playlist</h2>
      <p>
        <input
          {...register("title")}
          defaultValue={data.data.attributes.title}
        />
      </p>
      <p>
        <textarea
          {...register("description")}
          defaultValue={data.data.attributes.description!}
        ></textarea>
      </p>
      <button type="submit">Save</button>
    </form>
  );
};
