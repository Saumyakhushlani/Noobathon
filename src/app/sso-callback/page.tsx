"use client";

import * as React from "react";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SsoCallbackPage() {
  return (
    <main className="min-h-[calc(100vh-0px)] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 md:p-8 text-center">
        <div className="text-sm font-semibold text-gray-900">
          Completing sign-in…
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Please wait a moment.
        </div>
        <div className="mt-6">
          <AuthenticateWithRedirectCallback />
        </div>
      </div>
    </main>
  );
}

