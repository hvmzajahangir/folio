import { Session } from "@supabase/supabase-js";

export type Profile = {
  id: string | null;
  username: string | null;
  website: string | null;
  avatar_url: string | null;
  updated_at: Date;
};

export interface Props {
  session: Session;
}
