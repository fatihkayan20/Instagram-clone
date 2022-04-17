import { QueryKeys } from "types/QueryKeys";
import { useQuery } from "react-query";
import axios from "axios";
import { IQueryProps } from "types/IQueryProps";

export const useRefreshTokenQuery = ({ onSuccess, onError }: IQueryProps) => {
  return useQuery(
    QueryKeys.RefreshToken,
    async () =>
      await axios.get(`/auth/token`).then((result) => result.data.data),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError,
    }
  );
};
