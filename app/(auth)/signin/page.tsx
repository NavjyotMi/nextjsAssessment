"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/library/supabaseClient";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
        console.log(error.message);
        setError("Invalid email or password.");
      } else if (error.message.includes("user not found")) {
        setError("User not found. Please sign up.");
      } else {
        setError("Something went wrong!");
        console.log(error);
      }
    } else {
      console.log("User signed in:", data?.user);
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
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h1>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form onSubmit={handleSignIn} className="space-y-6">
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="my-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
