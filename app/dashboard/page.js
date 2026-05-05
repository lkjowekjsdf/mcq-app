"use client";

import { useEffect, useState } from "react";
import useUser from "../../lib/useUser";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const { user, loading } = useUser();
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/login";
      return;
    }

    if (user) {
      loadAttempts();
    }
  }, [user, loading]);

  async function loadAttempts() {
    const { data, error } = await supabase
      .from("quiz_attempts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setAttempts(data);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Logged in as: {user.email}</p>

      <button onClick={() => window.location.href = "/quiz"}>
        Start Quiz
      </button>

      <h2>Your Quiz History</h2>

      {attempts.length === 0 ? (
        <p>No attempts yet</p>
      ) : (
        <ul>
          {attempts.map((a) => (
            <li key={a.id}>
              <strong>{a.subject}</strong> — Score: {a.score}/{a.total_questions}
              {" "} (Attempt {a.attempt_number})
            </li>
          ))}
        </ul>
      )}

      <br />

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