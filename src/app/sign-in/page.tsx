"use client";

import * as React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [oauthSubmitting, setOauthSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await signIn.create({
        identifier: email,
        password,
      });

      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });
        router.push("/");
        return;
      }

      setError("Additional verification required. Please try another method.");
    } catch (err: any) {
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Failed to sign in.";
      setError(String(msg));
    } finally {
      setSubmitting(false);
    }
  }

  async function signInWithGoogle() {
    if (!isLoaded) return;
    setOauthSubmitting(true);
    setError(null);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Google sign-in failed.";
      setError(String(msg));
      setOauthSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-0px)] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Use Google or your email and password.
        </p>

        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={!isLoaded || oauthSubmitting}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 disabled:opacity-60"
        >
          {oauthSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-black/10" />
          <div className="text-xs font-semibold text-gray-500">OR</div>
          <div className="h-px flex-1 bg-black/10" />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[var(--brand-purple)]/40"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[var(--brand-blue)]/40"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!isLoaded || submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-extrabold text-white disabled:opacity-60"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Sign in
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            className="font-semibold text-[var(--brand-purple)] hover:underline underline-offset-4"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

