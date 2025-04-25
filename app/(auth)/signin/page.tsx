"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/library/supabaseClient";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null); // Store the session for later use

  // Handle form submission
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("Invalid email or password.");
      } else if (error.message.includes("user not found")) {
        setError("User not found. Please sign up.");
      } else {
        setError("Something went wrong!");
      }
    } else {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) {
        setError("Failed to retrieve session data.");
      } else {
        setSession(sessionData?.session); // Store session in state
      }
    }
  };

  // Ensure localStorage is only accessed client-side
  useEffect(() => {
    if (typeof window !== "undefined" && session) {
      // Only access localStorage on the client side
      const jwt = session.access_token;
      const userId = session.user?.id;
      if (userId && jwt) {
        localStorage.setItem("supabase_jwt", jwt);
        localStorage.setItem("user_id", userId);
        router.push("/dashboard");
      }
    }
  }, [session, router]); // Add session to dependency array

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
          Sign In
        </h1>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition "
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition  cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?
            <span
              onClick={() => router.push("/signup")}
              className="text-black font-medium hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
