import { createFileRoute, redirect } from "@tanstack/react-router";
import { useHealth } from "../hooks/useHealth";
import { useState } from "react";
import logo from "../assets/images/logo-transparent.png";
import mascot from "../assets/images/mascot-trans.png";
import { LoginDrawer } from "../components/LoginDrawer";
import { RegisterDrawer } from "../components/RegisterDrawer";
import { getAuthSession } from "../features/auth/auth.storage";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const session = getAuthSession();

    if (session?.access_token) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: HomePage,
});

function HomePage() {
  const healthQuery = useHealth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<{
    message: string;
    email: string;
  } | null>(null);

  return (
    <main className="relative min-h-screen bg-slate-950 text-white">
      <LoginDrawer
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        registrationSuccess={registrationSuccess}
        onClearRegistrationSuccess={() => setRegistrationSuccess(null)}
        register_state={() => setRegisterOpen(true)}
      />
      <RegisterDrawer
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onRegistrationSuccess={(data) => {
          setRegisterOpen(false);
          setLoginOpen(true);

          if (data) {
            setRegistrationSuccess({
              message: data.message,
              email: data.email,
            });
          } else {
            setRegistrationSuccess(null);
          }
        }}
      />
      {/* Background */}
      {/* <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-20%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute bottom-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute right-[-10%] top-[30%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div> */}

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-2 py-6 lg:px-20">
        {/* Header */}
        <header className="sticky top-4 z-50 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 shadow-2xl shadow-black/10 backdrop-blur-xl md:static md:border-0 md:bg-transparent md:px-0 md:py-3 md:shadow-none md:backdrop-blur-none">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              {/* Logo with backend status */}
              <div
                className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-white/10 p-2 shadow-lg ${
                  healthQuery.isSuccess
                    ? "border-primary shadow-primary/20"
                    : healthQuery.isError
                      ? "border-red-400/60 shadow-red-400/20"
                      : "border-amber-400/60 shadow-amber-400/20"
                }`}
              >
                <span
                  className={`absolute inset-0 rounded-xl ${
                    healthQuery.isSuccess
                      ? "animate-pulse bg-primary/10"
                      : healthQuery.isError
                        ? "bg-red-400/10"
                        : "animate-pulse bg-amber-400/10"
                  }`}
                />

                <img
                  src={logo}
                  alt="Allen Car Air Conditioning"
                  className="relative z-10 h-full w-full object-contain"
                />
              </div>

              <div>
                <h1 className="text-lg font-bold tracking-tight text-white">
                  Allen Car
                </h1>

                <p className="text-xs font-medium text-slate-400">
                  Air Conditioning
                </p>
              </div>
            </div>

            {/* Login — mobile only */}
            <button
              onClick={() => setLoginOpen(true)}
              className="group flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#002766] px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-[#002766]/20 transition hover:bg-blue-500 hover:shadow-[#002766]/30 md:hidden"
            >
              Sign in
              <span className="animate-[slideRight_1s_ease-in-out_infinite]">
                →
              </span>
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="flex items-center">
          <div className="grid w-full items-center gap-12 py-12 lg:grid-cols-2 lg:gap-20 lg:py-16">
            {/* Left */}
            <div className="max-w-2xl">
              <h2 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Keep your car
                <span className="block bg-gradient-to-r from-[#002766] via-cyan-300 to-[#002766] bg-clip-text text-transparent">
                  cool & comfortable.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400 sm:text-xl">
                Allen Car Air Conditioning provides reliable automotive air
                conditioning services designed to keep every journey cool,
                comfortable, and worry-free.
              </p>

              {/* Actions */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  // to="/login"
                  onClick={() => setLoginOpen(true)}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#002766] px-6 py-3.5 font-semibold shadow-lg shadow-[#002766]/20 transition hover:bg-blue-500 hover:shadow-[#002766]/30"
                >
                  Sign in
                  <span className="animate-[slideRight_1s_ease-in-out_infinite]">
                    →
                  </span>
                </button>

                <button
                  // to="/register"
                  onClick={() => setRegisterOpen(true)}
                  className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-slate-200 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
                >
                  Create an account
                </button>
              </div>

              {/* Trust points */}
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  Reliable service
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  Professional care
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  Customer focused
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative flex justify-center overflow-visible lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Main card */}
                <div className="relative w-full">
                  <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-blue-500/30 via-cyan-400/10 to-transparent blur-sm" />
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="relative flex min-h-[360px] flex-col items-center justify-center sm:min-h-[400px]">
                      <img
                        src={mascot}
                        alt="Allen Car Air Conditioning mascot"
                        className="h-60 w-60 object-contain drop-shadow-2xl sm:h-72 sm:w-72"
                      />
                      <div className="-mt-4 text-center leading-none">
                        <p className="text-lg font-medium uppercase tracking-[0.2em] text-blue-300 sm:text-xl sm:tracking-[0.25em]">
                          Allen Car
                        </p>
                        <h3 className="-mt-1 text-xl font-bold sm:text-2xl">
                          Air Conditioning
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================= */}
                {/* Secure Records */}
                {/* ========================= */}
                <div className=" absolute top-24 -right-28 flex w-1/2 justify-center max-md:static max-md:mt-4 max-md:w-full ">
                  <div className="w-full max-w-sm">
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
                </div>

                {/* ========================= */}
                {/* Scheduled */}
                {/* ========================= */}
                <div className=" absolute -top-10 left-1/3 w-[calc(100%+40px)] -translate-x-1/2 max-md:static max-md:mt-3 max-md:w-full max-md:translate-x-0 ">
                  <div className="w-fit max-md:w-full">
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

                {/* ========================= */}
                {/* Easy Searching */}
                {/* ========================= */}
                <div className=" absolute -bottom-10 left-1/2 w-[calc(100%+40px)] -translate-x-1/2 max-md:static max-md:mt-3 max-md:w-full max-md:translate-x-0 ">
                  <div className="w-fit max-md:w-full">
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
                  {/* Access Anywhere */}
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
                      Access your health information anywhere, whenever you need
                      it.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Copyright */}
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Allen Car Air Conditioning
            </p>
            {/* Contact Information */}
            <div className="flex flex-wrap items-center gap-5">
              {/* Facebook */}
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-400"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.1H8v3h2.6v8h2.9Z" />
                </svg>
                Facebook
              </a>
              {/* Phone */}
              <a
                href="tel:+630000000000"
                className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-emerald-400"
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
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67 A2 2 0 0 1 4.12 2h3 a2 2 0 0 1 2 1.72 c.12.9.33 1.78.62 2.63 a2 2 0 0 1-.45 2.11L8 9.73 a16 16 0 0 0 6 6l1.27-1.27 a2 2 0 0 1 2.11-.45 c.85.29 1.73.5 2.63.62 A2 2 0 0 1 22 16.92Z"
                  />
                </svg>
                Contact Us
              </a>
              {/* Email */}
              <a
                href="mailto:info@example.com"
                className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-400"
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
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4 c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m22 6-10 7L2 6"
                  />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
