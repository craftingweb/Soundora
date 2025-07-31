import { useQuery } from "@tanstack/react-query";
import { client } from "../../../shared/api/client.ts";

export const useMeQuery = () => {
  // Use the query to fetch current user data
  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const clientResponse = await client.GET("/auth/me");
      return clientResponse.data;
    },
  });
  return query;
};
