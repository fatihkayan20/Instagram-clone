import { useRefreshTokenQuery } from "./../queries/auth";
import axios from "axios";
import * as React from "react";
import { useRouter } from "next/router";
export const useAxios = () => {
  const router = useRouter();

  const { refetch } = useRefreshTokenQuery({
    onSuccess: (data) => {
      setToken(data.token);
    },
    onError: (error) => {
      router.push("/login");
    },
  });

  const setBaseUrl = React.useCallback(
    async (url = "https://instagram-backend.vercel.app/") => {
      axios.defaults.baseURL = url;
    },
    []
  );

  const setToken = React.useCallback(async (token: string) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  const setAuthInterceptor = React.useCallback(async () => {
    axios.interceptors.response.use(
      (response) => {
        console.log({ response });
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          console.log("token expired");
          refetch();
        }
        return Promise.reject(error);
      }
    );
  }, [refetch]);

  const setup = React.useCallback(async () => {
    const token = localStorage.getItem("token") || "";
    await setBaseUrl();
    await setToken(token);
    await setAuthInterceptor();
  }, [setBaseUrl, setToken, setAuthInterceptor]);

  return {
    setup,
    setToken,
  };
};
