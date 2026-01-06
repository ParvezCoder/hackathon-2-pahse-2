/**
 * Landing page with links to authentication.
 */
import Link from "next/link";
import { Button } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100 p-4">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Todo App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Organize your tasks efficiently with our simple and powerful todo
          application. Sign in to get started.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/auth/login">
            <Button variant="primary" size="lg">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="secondary" size="lg">
              Create Account
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Secure Authentication
              </h3>
              <p className="text-gray-600">
                Your data is protected with JWT-based authentication and bcrypt
                password hashing.
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Task Management
              </h3>
              <p className="text-gray-600">
                Create, update, complete, and delete tasks with an intuitive
                interface.
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Multi-User Support
              </h3>
              <p className="text-gray-600">
                Each user has their own private workspace with isolated task
                lists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
