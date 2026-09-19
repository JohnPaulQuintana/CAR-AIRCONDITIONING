import { useEffect, useState } from "react";

import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react";

import { useLogin } from "../hooks/useLogin";
import { loginSchema } from "../features/auth/schemas/login.schema";
import { setAuthSession } from "../features/auth/auth.storage";

import logo from "../assets/images/logo-white.png";

const PROJECT_SLUG = import.meta.env.VITE_PROJECT_CONNECTED_SLUG;

type LoginDrawerProps = {
  open: boolean;
  onClose: () => void;
  registrationSuccess?: {
    message: string;
    email: string;
  } | null;
  onClearRegistrationSuccess: () => void;
  register_state: () => void;
};

export function LoginDrawer({
  open,
  onClose,
  registrationSuccess,
  onClearRegistrationSuccess,
  register_state
}: LoginDrawerProps) {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
    project_slug?: string;
  }>({});

  /*
   * Prevent body scrolling while the drawer is open.
   */
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  /*
   * Close drawer with Escape.
   */
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

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

        onClose();
        await navigate({
  to: "/dashboard",
});

      } catch (error) {
        console.error("LOGIN ERROR:", error);
      }
    },
  });

  /*
   * Reset everything whenever the drawer opens.
   */
  useEffect(() => {
    if (!open) return;

    form.reset();
    setValidationErrors({});
    setShowPassword(false);
    loginMutation.reset();
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />

      {/* Drawer */}
      <aside
        aria-label="Login"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[100] flex h-dvh w-full max-w-[440px] flex-col border-l-4 border-[#002766] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b bg-primary px-5 sm:px-7">
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50">
              <img
                src={logo}
                alt="Allen Car Air Conditioning"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="leading-none">
              <p className="text-xl font-bold text-white">Allen Car</p>
              <p className="-mt-1 text-[12px] font-medium text-slate-200">
                Air Conditioning
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-200 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close login"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex min-h-full flex-col px-5 py-8 sm:px-8 sm:py-10">
            <div className="w-full">
              {/* Heading */}
              <div className="mb-7">
                <h2 className="text-2xl font-bold tracking-tight text-primary">
                  Welcome back
                </h2>
                
                {registrationSuccess ? (
                  <p className="text-sm leading-6 text-slate-500">
                    You can now sign in with <span className="text-green-600 font-semibold">{registrationSuccess.email}</span>.
                  </p>
                ) : (
                  <p className="text-sm leading-6 text-slate-500">
                    Sign in to access your account and manage your information.
                  </p>
                )}
              </div>

              {/* Form */}
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  loginMutation.reset();

                  form.handleSubmit();
                }}
                className="space-y-5"
              >
                {/* Email */}
                <form.Field
                  name="email"
                  children={(field) => (
                    <div>
                      <label
                        htmlFor={`login-${field.name}`}
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Email address
                      </label>

                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                          id={`login-${field.name}`}
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

                            if (registrationSuccess) {
                              onClearRegistrationSuccess();
                            }
                          }}
                          placeholder="you@example.com"
                          className={`h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                            validationErrors.email
                              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                              : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          }`}
                        />
                      </div>

                      {validationErrors.email && (
                        <p className="mt-2 text-xs font-medium text-red-500">
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
                      <div className="mb-2 flex items-center justify-between">
                        <label
                          htmlFor={`login-${field.name}`}
                          className="text-sm font-semibold text-slate-700"
                        >
                          Password
                        </label>

                        {/* <Link
                          to="/forgot-password"
                          onClick={onClose}
                          className="text-xs font-semibold text-[#002766] transition hover:text-blue-700"
                        >
                          Forgot password?
                        </Link> */}
                      </div>

                      <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                          id={`login-${field.name}`}
                          name={field.name}
                          type={showPassword ? "text" : "password"}
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
                          className={`h-12 w-full rounded-xl border bg-white pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                            validationErrors.password
                              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                              : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          }`}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {validationErrors.password && (
                        <p className="mt-2 text-xs font-medium text-red-500">
                          {validationErrors.password}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Project error */}
                {validationErrors.project_slug && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {validationErrors.project_slug}
                  </div>
                )}

                {/* Login error */}
                {loginMutation.isError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    Login failed. Please check your email and password.
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#002766] px-5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loginMutation.isPending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Register */}
              <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                <p className="text-sm text-slate-500">
                  Don't have an account?{" "}
                  <button
                    // to="/register"
                    onClick={()=>{
                      onClose()
                      register_state()
                    }}
                    className="font-semibold text-[#002766] transition hover:text-blue-700"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </div>

            {/* Bottom security */}
            <div className="mt-auto flex items-center justify-center gap-2 pt-10 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Your information is securely protected.</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
