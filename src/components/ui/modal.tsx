"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import TextBlockAnimation from "@/components/text-block-animation";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function Modal({ open, onClose, title, children, className }: ModalProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 backdrop-blur-xs"
        role="button"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={cn(
            "w-full max-w-5xl overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl",
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between gap-4 border-b border-black/10 px-5 py-4">
            <div className="min-w-0">
              {title ? (
                <div className="truncate text-2xl md:text-3xl font-extrabold text-gray-900">
                  <TextBlockAnimation
                    blockColor="var(--brand-purple)"
                    animateOnScroll={false}
                    delay={0.05}
                    duration={0.6}
                  >
                    {title}
                  </TextBlockAnimation>
                </div>
              ) : (
                <div className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  <TextBlockAnimation
                    blockColor="var(--brand-purple)"
                    animateOnScroll={false}
                    delay={0.05}
                    duration={0.6}
                  >
                    Details
                  </TextBlockAnimation>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10"
            >
              Close
            </button>
          </div>
          <div className="max-h-[70vh] overflow-auto px-5 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

