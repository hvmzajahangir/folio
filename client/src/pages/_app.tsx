import React from "react";
import { AppProps } from "next/app";
import "../styles/index.css";
import Head from "next/head";
import { AuthProvider } from "../context/Auth";
import PrivateRoute from "../components/PrivateRoute";
import { Provider } from "react-redux";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  const protectedRoutes: Array<string> = ["/dashboard"];
  const authRoutes: Array<string> = ["/"];
  return (
    <AuthProvider>
      <Provider store={store}>
        <Head>
          <title>Folio</title>
          <meta
            name="description"
            content="An equities portfolio tracker you will love to use"
          />
          <link rel="icon" href="/image/favicon.ico" />
        </Head>
        <PrivateRoute protectedRoutes={protectedRoutes} authRoutes={authRoutes}>
          <Component {...pageProps} />
        </PrivateRoute>
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
