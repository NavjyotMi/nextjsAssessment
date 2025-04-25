"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/library/supabaseClient";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      if (error.message.includes("already registered")) {
        setError("Email is already registered.");
      } else {
        setError("Something went wrong!");
      }
    } else {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) {
        setError("Failed to retrieve session data.");
      } else {
        if (sessionData?.session) {
          const jwt = sessionData.session.access_token;
          const userId = data?.user?.id;
          if (typeof window !== "undefined" && userId) {
            localStorage.setItem("supabase_jwt", jwt);
            localStorage.setItem("user_id", userId);
          }

          router.push("/dashboard");
        } else {
          setError("No session available after sign-up.");
        }
      }
    }
  };

  const handleGoogleSignIn = async () => {
    if (typeof window !== "undefined") {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/callback`,
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-10 border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Create an account
          </h1>
          {error && (
            <div className="mt-4 text-sm text-center text-red-600 bg-red-50 py-2 px-3 rounded-md border border-red-200">
              {error}
            </div>
          )}
          <form onSubmit={handleSignup} className="space-y-6 mt-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="you@example.com"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition  cursor-pointer${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-gray-500">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="mt-6 w-full py-3 rounded-xl border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44.5 20H24v8.5h11.9C34.4 33.4 30 37 24 37c-7 0-12.8-5.8-12.8-13S17 11 24 11c3.3 0 6.3 1.3 8.6 3.4l6.4-6.4C34.1 3.4 29.4 1 24 1 11.3 1 1 11.3 1 24s10.3 23 23 23c11.5 0 22-8.3 22-23 0-1.3-.2-2.5-.5-4z"
                fill="#FFC107"
              />
              <path
                d="M3.1 7.6l6.6 4.8C12.2 8 17.7 5 24 5c3.3 0 6.3 1.3 8.6 3.4l6.4-6.4C34.1 3.4 29.4 1 24 1 15.1 1 7.4 5.9 3.1 12.1z"
                fill="#FF3D00"
              />
              <path
                d="M24 47c5.4 0 10.1-1.9 13.8-5.1l-6.4-5.2c-2.3 1.7-5.2 2.6-8.4 2.6-6 0-10.9-3.9-12.7-9.2l-6.6 5C7.3 41.7 15 47 24 47z"
                fill="#4CAF50"
              />
              <path
                d="M44.5 20H24v8.5h11.9c-1.3 3.7-4.1 6.6-7.7 8.1l6.4 5.2C39.7 39.6 44 32.6 44 24c0-1.3-.2-2.5-.5-4z"
                fill="#1976D2"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700  cursor-pointer">
              Continue with Google
            </span>
          </button>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-black font-medium hover:underline cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
