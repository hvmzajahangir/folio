import React, {
  FC,
  ReactNode,
  useContext,
  useState,
  useEffect,
  createContext,
} from "react";
import { supabase } from "../lib/supabaseClient";
import { UserCredentials, Session, User } from "@supabase/supabase-js";
import { AuthContextState } from "../types";

const AuthContext = createContext({} as AuthContextState);

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<AuthContextState["user"]>();
  const [isLoading, setIsLoading] =
    useState<AuthContextState["isLoading"]>(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setIsLoading(false);

    // Listen for auth state changes (sign in, log out)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // Passed down to pages
  const value: AuthContextState = {
    signIn: (data: UserCredentials) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
