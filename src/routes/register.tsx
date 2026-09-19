import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold">Register</h1>

        <p className="mt-2 text-slate-400">Create your account</p>

        <div className="mt-6">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            ← Back
          </Link>
        </div>
      </div>
    </main>
  );
}
