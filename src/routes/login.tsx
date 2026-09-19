
import { useState } from "react";

import { Link, createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";

import { useLogin } from "../hooks/useLogin";
import { loginSchema } from "../features/auth/schemas/login.schema";
import { setAuthSession } from "../features/auth/auth.storage";

import logo from "../assets/images/logo-transparent.png";
import mascot from "../assets/images/mascot-trans.png";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

const PROJECT_SLUG = import.meta.env.VITE_PROJECT_CONNECTED_SLUG;

function LoginPage() {
  const loginMutation = useLogin();

  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
    project_slug?: string;
  }>({});

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      project_slug: PROJECT_SLUG ?? "",
    },

    onSubmit: async ({ value }) => {
      setValidationErrors({});

      const result = loginSchema.safeParse(value);

      if (!result.success) {
        const errors: {
          email?: string;
          password?: string;
          project_slug?: string;
        } = {};

        for (const issue of result.error.issues) {
          const field = issue.path[0];

          if (
            field === "email" ||
            field === "password" ||
            field === "project_slug"
          ) {
            errors[field] = issue.message;
          }
        }

        setValidationErrors(errors);

        return;
      }

      try {
        const data = await loginMutation.mutateAsync(result.data);

        setAuthSession(data);
      } catch (error) {
        console.error("LOGIN ERROR:", error);
      }
    },
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* ========================= */}
      {/* Background */}
      {/* ========================= */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute bottom-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute right-[-10%] top-[30%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      {/* ========================= */}
      {/* Subtle Grid */}
      {/* ========================= */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ========================= */}
      {/* Page Container */}
      {/* ========================= */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-10">

        {/* ========================= */}
        {/* Header */}
        {/* ========================= */}
        <header className="flex shrink-0 items-center justify-between py-4 sm:py-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] p-1.5 shadow-lg">
              <img
                src={logo}
                alt="Allen Car Air Conditioning"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="leading-none">
              <p className="text-lg font-semibold text-white sm:text-xl">
                Allen Car
              </p>

              <p className="-mt-0.5 text-xs text-slate-500 sm:text-sm">
                Air Conditioning
              </p>
            </div>
          </Link>

          {/* Home */}
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white sm:px-4"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3 11 9-8 9 8"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 10v10h14V10"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 20v-6h6v6"
              />
            </svg>

            <span className="hidden sm:inline">Home</span>
          </Link>
        </header>

        {/* ========================= */}
        {/* Main Content */}
        {/* ========================= */}
        <section className="flex flex-1 items-center py-4 sm:py-6 lg:py-4">
          <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-16">

            {/* ================================================= */}
            {/* LEFT — Homepage Visual */}
            {/* ================================================= */}
            <div className="relative hidden lg:flex lg:justify-center">
              <div className="relative w-full max-w-md">

                {/* Main Card */}
                <div className="relative">
                  <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-blue-500/30 via-cyan-400/10 to-transparent blur-sm" />

                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

                    <div className="relative flex min-h-[350px] flex-col items-center justify-center">
                      <img
                        src={mascot}
                        alt="Allen Car Air Conditioning mascot"
                        className="h-60 w-60 object-contain drop-shadow-2xl"
                      />

                      <div className="-mt-3 text-center leading-none">
                        <p className="text-lg font-medium uppercase tracking-[0.2em] text-blue-300">
                          Allen Car
                        </p>

                        <h3 className="-mt-1 text-xl font-bold">
                          Air Conditioning
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secure Records */}
                <div className="absolute right-[-110px] top-20 w-[55%]">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3 5 6v5c0 4.5 2.9 8.5 7 10 4.1-1.5 7-5.5 7-10V6l-7-3Z"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9 12 2 2 4-4"
                          />
                        </svg>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          Secure Records
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          Keep your information protected
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scheduled */}
                <div className="absolute -top-7 left-1/3 w-[calc(100%+20px)] -translate-x-1/2">
                  <div className="w-fit">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-xl">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                            />

                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"
                            />
                          </svg>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-white">
                            Scheduled
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Stay on top of appointments
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Easy Searching */}
                <div className="absolute -bottom-7 left-1/2 w-[calc(100%+20px)] -translate-x-1/2">
                  <div className="w-fit">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-xl">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-white">
                            Easy Searching
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Find health records quickly
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-2 px-2 text-center text-xs text-slate-500">
                    <svg
                      className="h-4 w-4 shrink-0 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v18m0-18 4 4m-4-4-4 4M5 9v10m0 0 3-3m-3 3-3-3M19 9v10m0 0-3-3m3 3 3-3"
                      />
                    </svg>

                    <span>
                      Access your health information anywhere, whenever you
                      need it.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* RIGHT — Login Form */}
            {/* ================================================= */}
            <div className="flex w-full justify-center lg:justify-end">
              <div className="w-full max-w-md">

                {/* White Login Card */}
                <div className="rounded-[2rem] bg-white p-6 text-slate-900 shadow-2xl shadow-black/30 sm:p-8">

                  {/* Heading */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-blue-600">
                      Account access
                    </p>

                    <h1 className="mt-1.5 text-2xl font-bold tracking-tight sm:text-3xl">
                      Welcome back
                    </h1>

                    <p className="mt-1.5 text-sm text-slate-500">
                      Sign in to access your health information.
                    </p>
                  </div>

                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      event.stopPropagation();

                      loginMutation.reset();

                      form.handleSubmit();
                    }}
                    className="space-y-4"
                  >
                    {/* Email */}
                    <form.Field
                      name="email"
                      children={(field) => (
                        <div>
                          <label
                            htmlFor={field.name}
                            className="mb-1.5 block text-sm font-medium text-slate-700"
                          >
                            Email address
                          </label>

                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                                />

                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m3 7 9 6 9-6"
                                />
                              </svg>
                            </div>

                            <input
                              id={field.name}
                              name={field.name}
                              type="email"
                              autoComplete="email"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(event) => {
                                field.handleChange(event.target.value);

                                setValidationErrors((previous) => ({
                                  ...previous,
                                  email: undefined,
                                }));
                              }}
                              placeholder="you@example.com"
                              className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                                validationErrors.email
                                  ? "border-red-400 focus:border-red-500"
                                  : "border-slate-200 focus:border-blue-500"
                              }`}
                            />
                          </div>

                          {validationErrors.email && (
                            <p className="mt-1.5 text-xs text-red-500">
                              {validationErrors.email}
                            </p>
                          )}
                        </div>
                      )}
                    />

                    {/* Password */}
                    <form.Field
                      name="password"
                      children={(field) => (
                        <div>
                          <label
                            htmlFor={field.name}
                            className="mb-1.5 block text-sm font-medium text-slate-700"
                          >
                            Password
                          </label>

                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                viewBox="0 0 24 24"
                              >
                                <rect
                                  width="16"
                                  height="11"
                                  x="4"
                                  y="10"
                                  rx="2"
                                />

                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8 10V7a4 4 0 0 1 8 0v3"
                                />
                              </svg>
                            </div>

                            <input
                              id={field.name}
                              name={field.name}
                              type="password"
                              autoComplete="current-password"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(event) => {
                                field.handleChange(event.target.value);

                                setValidationErrors((previous) => ({
                                  ...previous,
                                  password: undefined,
                                }));
                              }}
                              placeholder="Enter your password"
                              className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                                validationErrors.password
                                  ? "border-red-400 focus:border-red-500"
                                  : "border-slate-200 focus:border-blue-500"
                              }`}
                            />
                          </div>

                          {validationErrors.password && (
                            <p className="mt-1.5 text-xs text-red-500">
                              {validationErrors.password}
                            </p>
                          )}
                        </div>
                      )}
                    />

                    {/* Project configuration error */}
                    {validationErrors.project_slug && (
                      <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                        {validationErrors.project_slug}
                      </div>
                    )}

                    {/* API error */}
                    {loginMutation.isError && (
                      <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="9" />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4m0 4h.01"
                          />
                        </svg>

                        <span>
                          Login failed. Please check your email and password.
                        </span>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loginMutation.isPending}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loginMutation.isPending ? (
                        <>
                          <svg
                            className="h-5 w-5 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />

                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
                            />
                          </svg>

                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign in

                          <svg
                            className="h-5 w-5 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 12h14m-6-6 6 6-6 6"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Register */}
                  <div className="mt-5 border-t border-slate-100 pt-5 text-center">
                    <p className="text-sm text-slate-500">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="font-semibold text-blue-600 transition hover:text-blue-500"
                      >
                        Create an account
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Security note */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-600">
                  <svg
                    className="h-4 w-4 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3 5 6v5c0 4.5 2.9 8.5 7 10 4.1-1.5 7-5.5 7-10V6l-7-3Z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 12 2 2 4-4"
                    />
                  </svg>

                  <span>Your information is securely protected.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= */}
        {/* Footer */}
        {/* ========================= */}
        <footer className="shrink-0 border-t border-white/5 py-3 text-center text-xs text-slate-600">
          Secure health information management
        </footer>
      </div>
    </main>
  );
}

