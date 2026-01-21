"use client";

import * as React from "react";

import { Browser as BrowserAnimation } from "@/components/Animation.jsx";
import AwarenessTag from "@/components/awareness/AwarenessTag";
import { CircleHelp, Globe, ShieldCheck, TriangleAlert } from "lucide-react";

export default function UnknownWebsitesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-10 py-10">
      <div
        className="rounded-2xl border-2 p-6 md:p-8"
        style={{
          borderColor: "var(--brand-purple)",
          backgroundColor: "color-mix(in oklab, var(--brand-purple) 6%, white)",
        }}
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[var(--brand-purple)]" />
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                Avoid Unknown / Untrusted Websites
              </h2>
            </div>

            <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
              Don’t visit random websites or click unknown links — they can be risky.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <CircleHelp className="h-4 w-4 text-[var(--brand-blue)]" />
                  Why it matters
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="blue">Malware downloads</AwarenessTag>
                  <AwarenessTag tone="blue">Phishing (fake login pages)</AwarenessTag>
                  <AwarenessTag tone="blue">Browser hijackers & popups</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <ShieldCheck className="h-4 w-4 text-[var(--brand-purple)]" />
                  What to do instead
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="purple">
                    Prefer trusted domains (.gov, official brands)
                  </AwarenessTag>
                  <AwarenessTag tone="purple">Check spelling (paytm-offer.com)</AwarenessTag>
                  <AwarenessTag tone="purple">HTTPS + lock icon (still verify domain)</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <TriangleAlert className="h-4 w-4 text-[var(--brand-pink)]" />
                  Red flags
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="pink">Too many popups</AwarenessTag>
                  <AwarenessTag tone="pink">“Click to continue” buttons</AwarenessTag>
                  <AwarenessTag tone="pink">Forced downloads</AwarenessTag>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[380px] overflow-hidden rounded-2xl border border-black/10 p-4 bg-white">
              <div className="flex justify-center">
                <BrowserAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

