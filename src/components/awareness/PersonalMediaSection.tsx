"use client";

import * as React from "react";

import AwarenessTag from "@/components/awareness/AwarenessTag";
import { ImageUpload } from "@/components/Animation.jsx";
import { CircleHelp, Image, ShieldCheck, TriangleAlert } from "lucide-react";

export default function PersonalMediaSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-10 py-10">
      <div
        className="rounded-2xl border-2 p-6 md:p-8"
        style={{
          borderColor: "var(--brand-pink)",
          backgroundColor: "color-mix(in oklab, var(--brand-pink) 6%, white)",
        }}
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-[var(--brand-pink)]" />
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                Don’t Share Personal Photos/Media on Unknown Websites
              </h2>
            </div>

            <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
              Uploading personal photos can lead to misuse, leaks, or identity scams—only share on trusted platforms.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <CircleHelp className="h-4 w-4 text-[var(--brand-blue)]" />
                  Why it matters
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="blue">Photos can be reused for fake profiles</AwarenessTag>
                  <AwarenessTag tone="blue">Metadata may expose location/device</AwarenessTag>
                  <AwarenessTag tone="blue">Leaked media can’t be “taken back”</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <ShieldCheck className="h-4 w-4 text-[var(--brand-purple)]" />
                  What to do instead
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="purple">Use trusted apps/sites only</AwarenessTag>
                  <AwarenessTag tone="purple">Avoid uploading ID/selfie on random sites</AwarenessTag>
                  <AwarenessTag tone="purple">Review privacy settings before posting</AwarenessTag>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <TriangleAlert className="h-4 w-4 text-[var(--brand-pink)]" />
                  Red flags
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AwarenessTag tone="pink">“Upload photo to unlock reward”</AwarenessTag>
                  <AwarenessTag tone="pink">No privacy policy / unknown company</AwarenessTag>
                  <AwarenessTag tone="pink">Asks for camera + gallery permissions</AwarenessTag>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[380px] overflow-hidden rounded-2xl border border-black/10 p-4 bg-white">
              <div className="flex justify-center">
                <ImageUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

