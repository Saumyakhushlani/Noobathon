"use client";

import * as React from "react";

import AwarenessTag from "@/components/awareness/AwarenessTag";
import Cookies from "@/components/awareness/Cookies.jsx";
import { CircleHelp, Cookie, Settings2, TriangleAlert } from "lucide-react";

export default function CookieConsentSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-10 py-10">
      <div
        className="rounded-2xl border-2 p-6 md:p-8"
        style={{
          borderColor: "var(--brand-pink)",
          backgroundColor: "color-mix(in oklab, var(--brand-pink) 10%, var(--background))",
        }}
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-black/10 p-4 bg-white">
              
              <div className="flex justify-center">
                <Cookies />
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-[var(--brand-pink)]" />
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                Don’t Click “Accept All” Blindly
              </h2>
            </div>

            <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
              Cookies aren’t always bad — but “Accept All” can track your data.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <CircleHelp className="h-4 w-4 text-[var(--brand-purple)]" />
                  Why it matters
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="purple">Track you across websites</AwarenessTag>
                  <AwarenessTag tone="purple">Build your profile for ads</AwarenessTag>
                  <AwarenessTag tone="purple">Share data with third parties</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <Settings2 className="h-4 w-4 text-[var(--brand-blue)]" />
                  What to do instead
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="blue">Reject all / Essential only</AwarenessTag>
                  <AwarenessTag tone="blue">Use “Manage preferences”</AwarenessTag>
                  <AwarenessTag tone="blue">Accept all only on trusted sites</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <TriangleAlert className="h-4 w-4 text-[var(--brand-pink)]" />
                  Red flags
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="pink">“Reject” button hidden</AwarenessTag>
                  <AwarenessTag tone="pink">Too many 3rd‑party trackers</AwarenessTag>
                  <AwarenessTag tone="pink">Unknown sites forcing consent</AwarenessTag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

