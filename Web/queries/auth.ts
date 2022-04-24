import { QueryKeys } from "types/QueryKeys";
import { useQuery, UseQueryOptions } from "react-query";
import axios, { AxiosError } from "axios";
import { IRefreshTokenReturn } from "types/QueryReturnTypes";

export const useRefreshTokenQuery = (
  options?: Omit<
    UseQueryOptions<undefined, AxiosError, IRefreshTokenReturn>,
    "queryKey"
  >
) => {
  return useQuery(
    QueryKeys.RefreshToken,
    async () =>
      await axios.get(`/auth/token`).then((result) => result.data.data),
    options
  );
};
