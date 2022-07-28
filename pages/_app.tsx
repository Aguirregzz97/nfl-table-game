import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import SideBar from "../components/SideBar";
import { useRouter } from "next/router";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useRef } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const queryClient = useRef(new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <div className="flex">
            {!router.pathname.includes("/login") && (
              <>
                <div className="ml-20" />
                <SideBar />
              </>
            )}
            <Component {...pageProps} />
          </div>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
