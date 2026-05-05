"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();

      setUser(data.user);
      setLoading(false);
    }

    getUser();
  }, []);

  return { user, loading };
}