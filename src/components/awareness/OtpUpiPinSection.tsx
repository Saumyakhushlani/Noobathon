"use client";

import * as React from "react";

import AwarenessTag from "@/components/awareness/AwarenessTag";
import { OtpAnimation } from "@/components/Animation.jsx";
import { KeyRound, ShieldCheck, Smartphone, TriangleAlert } from "lucide-react";

export default function OtpUpiPinSection() {
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
              <KeyRound className="h-5 w-5 text-[var(--brand-blue)]" />
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                Never Share OTP / UPI PIN
              </h2>
            </div>

            <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
              OTP is for making payments, not receiving money.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <ShieldCheck className="h-4 w-4 text-[var(--brand-purple)]" />
                  Always
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="purple">Don’t share OTP with anyone</AwarenessTag>
                  <AwarenessTag tone="purple">Don’t share UPI PIN</AwarenessTag>
                  <AwarenessTag tone="purple">Verify the payment screen yourself</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <TriangleAlert className="h-4 w-4 text-[var(--brand-pink)]" />
                  Red flags
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="pink">“I’m sending money, share OTP”</AwarenessTag>
                  <AwarenessTag tone="pink">Pressure to act fast</AwarenessTag>
                  <AwarenessTag tone="pink">Unknown caller / WhatsApp message</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <Smartphone className="h-4 w-4 text-[var(--brand-blue)]" />
                  UPI safety
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="blue">Reject unknown UPI collect requests</AwarenessTag>
                  <AwarenessTag tone="blue">Only pay after checking recipient name</AwarenessTag>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[380px] rounded-2xl border border-black/10 p-4 bg-white">
              <div className="flex justify-center">
                <OtpAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

