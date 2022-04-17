import axios from "axios";
import * as React from 'react'
export const useAxios = () => {
  const setBaseUrl = React.useCallback(async (url = "https://instagram-backend.vercel.app/") => {
    axios.defaults.baseURL = url;
  },[]);

  const setToken = React.useCallback(async (token: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },[]);

  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      if (error.response.status === 401) {
      }
      return Promise.reject(error);
    }
  );

  const setup = React.useCallback(async () => {
    await setBaseUrl();
    await setToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhdGkiLCJlbWFpbCI6ImZhdGlAZ21haWwuY29tIiwiaWQiOiI2MjUyY2JhOGM1OTM1MjgxNmEzMTEyNWMiLCJpYXQiOjE2NTAxMzEwMjMsImV4cCI6MTY1MDEzNDYyM30.CovLIInbjzHARXaaCxdgAnZQMD78JG5kOA2nIiAwGBI"
    );
  },[setBaseUrl, setToken]);

  return {
    setup,
  };
};
