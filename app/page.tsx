import Button from "@/Component/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen bg-gray-900 text-white flex flex-col justify-center items-center text-center py-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to MyApp</h1>
        <p className="text-xl mb-8">
          A simple, modern, and responsive Next.js application.
        </p>
        <Link href="/signup">
          <Button label="Get Started" />
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-4">Feature 1</h3>
              <p className="text-lg text-gray-600">
                Explanation of feature 1 goes here.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-4">Feature 2</h3>
              <p className="text-lg text-gray-600">
                Explanation of feature 2 goes here.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-4">Feature 3</h3>
              <p className="text-lg text-gray-600">
                Explanation of feature 3 goes here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 MyApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
