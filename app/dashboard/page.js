"use client";

import useUser from "../../lib/useUser";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Logged in as: {user.email}</p>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.href = "/login";
        }}
      >
        Logout
      </button>

      <button onClick={() => window.location.href = "/quiz"}>
        Start Quiz
      </button>
    </div>
  );
}