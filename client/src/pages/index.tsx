import type { NextPage } from "next";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/Auth";
import Image from "next/image";
import logo from "../../public/image/logo.png";
import Alert from "../components/Alert";

const Home: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { user, signIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [alertType, setAlertType] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await signIn({ email });
      if (error) {
        throw error;
      }
      setAlertType("success");
      setAlertMessage("Check your email for the login link!");
    } catch (error: any) {
      setAlertType("warning");
      setAlertMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-black to-gray-900 min-h-screen text-white">
      <div className="p-12 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg grid justify-items-center">
        <div className="mb-4 w-full">
          <Image
            src={logo}
            alt="Folio logo"
            layout="responsive"
            placeholder="blur"
          />
        </div>
        <form onSubmit={handleSignIn}>
          <div className="w-full">
            <input
              className="my-4 w-full rounded bg-gray-500 hover:bg-gray-400 placeholder-slate-200 text-slate-200"
              type="email"
              placeholder="Your email"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              <span>
                {loading ? "Hang in there..." : "Log in using magic link"}
              </span>
            </button>
          </div>
        </form>
      </div>
      {alertMessage && alertType && (
        <div className="mt-8">
          <Alert alertType={alertType} alertMessage={alertMessage} />
        </div>
      )}
    </div>
  );
};

export default Home;
