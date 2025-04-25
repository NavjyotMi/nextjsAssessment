import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen bg-gray-950 text-white flex flex-col justify-center items-center text-center px-4 sm:px-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Summarize Your Notes.
          <br />
          Stay Organized Effortlessly.
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-10">
          MyApp lets you turn your messy notes into clean, concise summaries
          using AI. All your ideas, structured and searchable—instantly.
        </p>

        <ul className="text-gray-400 text-base sm:text-lg space-y-2 mb-10">
          <li>✔ Summarize long notes in one click</li>
          <li>✔ Automatically categorize by topic</li>
          <li>✔ Minimal interface, zero distractions</li>
        </ul>

        <Link href="/signup">
          <button className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-200 active:bg-gray-300 transition duration-200 cursor-pointer">
            Get Started
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-sm text-center">
        <p>&copy; 2025 MyApp. Built for clarity.</p>
      </footer>
    </div>
  );
}
