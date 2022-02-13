import React, {
  FC,
  ReactNode,
  useContext,
  useState,
  useEffect,
  createContext,
} from "react";
import { supabase } from "../utils/supabaseClient";
import { UserCredentials, Session, User } from "@supabase/supabase-js";
import { AuthContextState } from "../types";

const AuthContext = createContext({} as AuthContextState);

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<AuthContextState["user"]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for auth state changes (sign in, log out)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // Passed down to pages
  const value = {
    signIn: (data: UserCredentials) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
