"use client";
import { supabase } from "../../lib/supabase";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Check your email to confirm signup");
  }

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    // redirect after login
    window.location.href = "/";
  }

  return (
    <div>
      <h2>Login / Sign Up</h2>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Login</button>
    </div>
  );
}