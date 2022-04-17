import "../styles/globals.scss";
import type { AppProps } from "next/app";
import UserLayout from "@components/layout/UserLayout";
import * as React from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { useAxios } from "hooks/useAxios";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { AuthChecker } from "@components/layout/AuthChecker";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthChecker>
          <UserLayout>
            <Component {...pageProps} />
          </UserLayout>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthChecker>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
