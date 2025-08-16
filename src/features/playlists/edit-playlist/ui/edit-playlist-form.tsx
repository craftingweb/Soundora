import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SchemaUpdatePlaylistRequestPayload } from "../../../../shared/api/schema.ts";
import { client } from "../../../../shared/api/client.ts";
import { useEffect } from "react";

type Props = {
  playlistId: string | null;
};

export const EditPlaylistForm = ({ playlistId }: Props) => {
  const { register, handleSubmit, reset } =
    useForm<SchemaUpdatePlaylistRequestPayload>();

  useEffect(() => {
    reset();
  }, [playlistId]);

  const { data, isPending, isError } = useQuery<string | null>({
    queryKey: ["playlists", playlistId],
    queryFn: async () => {
      const response = await client.GET(`/playlists/{playlistId}`, {
        params: { path: { playlistId: playlistId! } },
      });
      return response.data!;
    },
    enabled: !!playlistId,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: SchemaUpdatePlaylistRequestPayload) => {
      const response = await client.PUT(`/playlists/{playlistId}`, {
        params: { path: { playlistId: playlistId! } },
        body: { ...data, tagIds: [] },
      });
      return response.data;
    },

  onMutate: async (newTodo) => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries({ queryKey: ['playlists'] })

    // Snapshot the previous value
    const previousTodos = queryClient.getQueryData(['playlists', playlistId])

    // Optimistically update to the new value
    queryClient.setQueryData(['todos', playlistsId],newTodo)

    // Return a context object with the snapshotted value
    return { previousTodos }
  },
  // If the mutation fails,
  // use the context returned from onMutate to roll back
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context.previousTodos)
  },
  // Always refetch after error or success:
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})

  });

  const onSubmit = (data: SchemaUpdatePlaylistRequestPayload) => {
    mutate(data);
  };

  if (!playlistId) return <></>;
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
