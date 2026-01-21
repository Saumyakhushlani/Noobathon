"use client";

import * as React from "react";

import AwarenessTag from "@/components/awareness/AwarenessTag";
import { Scam } from "@/components/Animation.jsx";
import { BadgeIndianRupee, Briefcase, CircleHelp, ShieldCheck, TriangleAlert } from "lucide-react";

export default function JobInternshipScamSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-10 py-10">
      <div
        className="rounded-2xl border-2 p-6 md:p-8"
        style={{
          borderColor: "var(--brand-purple)",
          backgroundColor: "color-mix(in oklab, var(--brand-purple) 10%, var(--background))",
        }}
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-[var(--brand-purple)]" />
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                Avoid Job / Internship Scams
              </h2>
            </div>

            <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
              If they ask you for money to “get hired”, it’s a scam. Legit jobs don’t charge to hire.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <CircleHelp className="h-4 w-4 text-[var(--brand-blue)]" />
                  Common demands
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="blue">
                    <span className="inline-flex items-center gap-1">
                      <BadgeIndianRupee className="h-4 w-4" />
                      Registration fee
                    </span>
                  </AwarenessTag>
                  <AwarenessTag tone="blue">Training kit / course fee</AwarenessTag>
                  <AwarenessTag tone="blue">Verification / onboarding fee</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <ShieldCheck className="h-4 w-4 text-[var(--brand-purple)]" />
                  What to do instead
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="purple">Only apply on trusted platforms</AwarenessTag>
                  <AwarenessTag tone="purple">Verify company email/domain</AwarenessTag>
                  <AwarenessTag tone="purple">Talk to HR via official website contact</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <TriangleAlert className="h-4 w-4 text-[var(--brand-pink)]" />
                  Red flags
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="pink">“Pay first, then offer letter”</AwarenessTag>
                  <AwarenessTag tone="pink">Unrealistic salary for no experience</AwarenessTag>
                  <AwarenessTag tone="pink">Pressure to pay quickly</AwarenessTag>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[380px] rounded-2xl border border-black/10 p-4 bg-white">
              <div className="flex justify-center">
                <Scam />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

