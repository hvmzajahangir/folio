import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import { Session } from "@supabase/supabase-js";

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <div className="bg-gradient-to-r from-black to-gray-900 flex items-center justify-center min-h-screen text-white">
      <Head>
        <title>Folio</title>
        <meta
          name="description"
          content="An equities portfolio tracker you will love to use"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user?.id} session={session} />
      )}
    </div>
  );
};

export default Home;
