"use client";

import * as React from "react";

import Warning from "@/components/awareness/Warning.jsx";
import AwarenessTag from "@/components/awareness/AwarenessTag";
import { CircleHelp, ShieldCheck, Siren, TriangleAlert } from "lucide-react";

export default function FakeWarningsSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-10 py-10">
      <div
        className="rounded-2xl border-2 p-6 md:p-8"
        style={{
          borderColor: "var(--brand-blue)",
          backgroundColor: "color-mix(in oklab, var(--brand-blue) 10%, var(--background))",
        }}
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Siren className="h-5 w-5 text-[var(--brand-blue)]" />
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                Fake Scam Popups = Panic Traps
              </h2>
            </div>

            <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
              Popups like “Your phone is hacked” are usually fake and meant to scare you.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <CircleHelp className="h-4 w-4 text-[var(--brand-purple)]" />
                  Why it matters
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="purple">Download malware</AwarenessTag>
                  <AwarenessTag tone="purple">Call fake tech support</AwarenessTag>
                  <AwarenessTag tone="purple">Enter password / OTP</AwarenessTag>
                  <AwarenessTag tone="purple">Notification spam</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <ShieldCheck className="h-4 w-4 text-[var(--brand-blue)]" />
                  What to do instead
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="blue">Close the tab immediately</AwarenessTag>
                  <AwarenessTag tone="blue">Don’t click “Fix Now” / “Scan Now”</AwarenessTag>
                  <AwarenessTag tone="blue">Check the account in the official app/settings</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <TriangleAlert className="h-4 w-4 text-[var(--brand-pink)]" />
                  Red flags
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="pink">Loud siren/alarm sound</AwarenessTag>
                  <AwarenessTag tone="pink">Timer countdown (“Act in 2 minutes!”)</AwarenessTag>
                  <AwarenessTag tone="pink">“Call this number now”</AwarenessTag>
                  <AwarenessTag tone="pink">Won’t let you close popup</AwarenessTag>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-black/10 p-4 bg-white">
              <div className="flex justify-center">
                <Warning />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

