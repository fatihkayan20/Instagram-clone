import axios, { AxiosError } from "axios";
import { QueryClient, useQuery, UseQueryOptions } from "react-query";
import { ILikeResponse } from "types/ILikeResponse";
import { IPost } from "types/IPost";
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

export const useGetPostLikesQuery = (
  postId: string,
  page: number = 1,
  options?: Omit<
    UseQueryOptions<ILikeResponse, AxiosError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ILikeResponse, AxiosError>(
    [QueryKeys.GetPostLikes, postId, page],
    async () =>
      await axios
        .get(`likes/${postId}/${page}`)
        .then((result) => result.data.data),
    {
      keepPreviousData: true,
      ...options,
    }
  );
};
