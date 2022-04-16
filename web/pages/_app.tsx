import "../styles/globals.scss";
import type { AppProps } from "next/app";
import UserLayout from "@components/layout/UserLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserLayout>
      <Component {...pageProps} />
    </UserLayout>
  );
}

export default MyApp;
