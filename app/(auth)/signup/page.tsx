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

  // With Email and Password
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
      console.log("User signed up:", data.user);

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) {
        setError("Failed to retrieve session data.");
      } else {
        console.log("Session data after sign up:", sessionData);
        if (sessionData?.session) {
          const jwt = sessionData.session.access_token;
          const userId = data?.user?.id;
          if (userId) {
            localStorage.setItem("supabase_jwt", jwt);
            localStorage.setItem("user_id", userId);
          }
          console.log("User ID stored in localStorage:", userId);
          console.log("JWT stored in localStorage:", jwt);

          router.push("/dashboard");
        } else {
          setError("No session available after sign-up.");
        }
      }
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    setLoading(false);
    console.log("Google Sign-In data:", data);
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard"); // Redirect to the dashboard after login
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Sign Up
        </h1>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700 focus:outline-none transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="my-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none transition duration-300"
          >
            Sign Up with Google
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/signin")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
