"use client";

import * as React from "react";

import AwarenessTag from "@/components/awareness/AwarenessTag";
import { CardAnimation } from "@/components/Animation.jsx";
import { CreditCard, LockKeyhole, ShieldCheck, TriangleAlert } from "lucide-react";

export default function CardDetailsSection() {
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
              <CreditCard className="h-5 w-5 text-[var(--brand-purple)]" />
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                Don’t Share Card Details on Anonymous Websites
              </h2>
            </div>

            <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
              Never share your card number, CVV, or OTP on unknown links/forms—even if it looks “official”.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <LockKeyhole className="h-4 w-4 text-[var(--brand-blue)]" />
                  Never share
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="blue">Card number</AwarenessTag>
                  <AwarenessTag tone="blue">CVV</AwarenessTag>
                  <AwarenessTag tone="blue">OTP</AwarenessTag>
                  <AwarenessTag tone="blue">Expiry date</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <ShieldCheck className="h-4 w-4 text-[var(--brand-purple)]" />
                  Safe practice
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="purple">Pay only on trusted gateways</AwarenessTag>
                  <AwarenessTag tone="purple">Type URL yourself (don’t click random links)</AwarenessTag>
                  <AwarenessTag tone="purple">Use UPI / cards only on verified apps</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <TriangleAlert className="h-4 w-4 text-[var(--brand-pink)]" />
                  Red flags
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="pink">“Pay small fee to confirm”</AwarenessTag>
                  <AwarenessTag tone="pink">Shortened links / unknown domains</AwarenessTag>
                  <AwarenessTag tone="pink">Asks CVV/OTP on chat/call</AwarenessTag>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[380px] overflow-hidden rounded-2xl border border-black/10 p-4 bg-white">
              <div className="flex justify-center">
                <CardAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

