import React from "react";
import { AppProps } from "next/app";
import "../styles/index.css";
import Head from "next/head";
import { AuthProvider } from "../context/Auth";
import PrivateRoute from "../components/PrivateRoute";

function MyApp({ Component, pageProps }: AppProps) {
  const protectedRoutes: Array<string> = ["/dashboard"];
  const authRoutes: Array<string> = ["/"];
  return (
    <AuthProvider>
      <Head>
        <title>Folio</title>
        <meta
          name="description"
          content="An equities portfolio tracker you will love to use"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-r from-black to-gray-900 flex items-center justify-center min-h-screen text-white">
        <PrivateRoute protectedRoutes={protectedRoutes} authRoutes={authRoutes}>
          <Component {...pageProps} />
        </PrivateRoute>
      </div>
    </AuthProvider>
  );
}

export default MyApp;
