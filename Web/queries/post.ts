import axios from "axios";
import { QueryClient, useQuery } from "react-query";
import { IPost } from "types/IPost";
import { IResponse } from "types/IResponse";
import { QueryKeys } from "types/QueryKeys";

export const useGetPostQuery = () => {
  return useQuery<IPost[]>(
    QueryKeys.GetPosts,
    async () => await axios.get(`/posts`).then((result) => result.data.data),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const getPrefetchPostsQuery = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<IPost[]>(
    QueryKeys.GetPosts,
    async () => await axios.get(`/posts`).then((result) => result.data.data)
  );

  return queryClient;
};
