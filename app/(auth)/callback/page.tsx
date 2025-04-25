"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/library/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error("Error fetching session:", error);
        return;
      }

      const jwt = data.session.access_token;
      const userId = data.session.user?.id;

      if (userId && jwt) {
        localStorage.setItem("supabase_jwt", jwt);
        localStorage.setItem("user_id", userId);
      }

      router.push("/dashboard");
    };

    handleAuth();
  }, [router]);

  return <div className="text-center mt-8">Logging you in...</div>;
}
