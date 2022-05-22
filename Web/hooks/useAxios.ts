import axios from "axios";
import { useRefreshTokenQuery } from "queries/auth";
import * as React from "react";
import { IRefreshTokenReturn } from "types/QueryReturnTypes";
export const useAxios = () => {
  const onSuccessRefreshToken = (data: IRefreshTokenReturn) => {
    setToken(data.token);
  };
  const { refetch } = useRefreshTokenQuery({
    onSuccess: onSuccessRefreshToken,

    enabled: false,
    refetchOnWindowFocus: false,
  });

  const setBaseUrl = React.useCallback(
    async (url = "http://localhost:3001/") => {
      axios.defaults.baseURL = url;
    },
    []
  );

  const setToken = React.useCallback(async (token: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  }, []);

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response.status === 401) {
        refetch();
      }
      return Promise.reject(error);
    }
  );

  const setup = React.useCallback(async () => {
    const token = localStorage.getItem("token");
    await setBaseUrl();
    await setToken(token || "");
  }, [setBaseUrl, setToken]);

  return {
    setup,
  };
};
