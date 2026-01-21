
"use client";

import UnknownWebsitesSection from "@/components/awareness/UnknownWebsitesSection";
import CookieConsentSection from "@/components/awareness/CookieConsentSection";
import FakeWarningsSection from "@/components/awareness/FakeWarningsSection";
import JobInternshipScamSection from "@/components/awareness/JobInternshipScamSection";
import OtpUpiPinSection from "@/components/awareness/OtpUpiPinSection";
import PersonalMediaSection from "@/components/awareness/PersonalMediaSection";
import CardDetailsSection from "@/components/awareness/CardDetailsSection";
import { Shield } from "lucide-react";

export default function Page() {
  return (
    <main className="awareness-root pb-16">
      <section className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-10 pt-14 pb-6">
        <div className="flex items-center gap-3">
          <Shield className="h-9 w-9 md:h-12 md:w-12 text-[var(--brand-purple)]" />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Cyber Awareness
          </h1>
        </div>
        <p className="mt-3 text-sm md:text-base text-gray-600 max-w-3xl leading-relaxed">
          Simple habits that protect you from common online scams — learn the red flags,
          and what to do instead.
        </p>
      </section>

      <UnknownWebsitesSection />
      <CookieConsentSection />
      <FakeWarningsSection />
      <JobInternshipScamSection />
      <OtpUpiPinSection />
      <PersonalMediaSection />
      <CardDetailsSection />
    </main>
  );
}
