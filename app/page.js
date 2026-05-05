"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  useEffect(() => {
    async function check() {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/login";
      }
    }

    check();
  }, []);

  return <p>Loading...</p>;
}