import { Session, User } from "@supabase/supabase-js";
import { ReactNode } from "react";

export type Profile = {
  id: string | null;
  username: string | null;
  website: string | null;
  avatar_url: string | null;
  updated_at: Date;
};

export interface AccountProps {
  session: Session;
}

export interface AuthContextState {
  signIn: Function;
  signOut: Function;
  user: User | null | undefined;
  isLoading: boolean;
}

export type PrivateRouteProps = {
  protectedRoutes?: Array<string>;
  authRoutes?: Array<string>;
  children?: ReactNode;
};
