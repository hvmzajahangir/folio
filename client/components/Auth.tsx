import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import type { NextPage } from "next";
import Image from "next/image";
import logo from "../public/logo.png";

const Auth: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) {
        throw error;
      }
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg grid justify-items-center">
      <div className="mb-4 w-full">
        <Image
          src={logo}
          alt="Folio logo"
          layout="responsive"
          placeholder="blur"
        />
      </div>
      <div className="m-2 w-full">
        <input
          className="w-full rounded bg-gray-500 hover:bg-gray-400 placeholder-slate-200 text-slate-200"
          type="email"
          placeholder="Your email"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="m-2 w-full">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin(email);
          }}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          <span>{loading ? "Loading" : "Log in using magic link"}</span>
        </button>
      </div>
    </div>
  );
};

export default Auth;
