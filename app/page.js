"use client";

import useUser from "../lib/useUser";
import { supabase } from "../lib/supabase";

export default function Home() {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div>
      <h1>Welcome</h1>
      <p>{user.email}</p>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}