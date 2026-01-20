"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as React from "react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type TextBlockAnimationProps = {
  children: React.ReactNode;
  /** Reveal when scrolled into view */
  animateOnScroll?: boolean;
  /** Delay before playing (seconds) */
  delay?: number;
  /** Block wipe color */
  blockColor?: string;
  /** Total duration for each wipe phase (seconds) */
  duration?: number;
  /** Extra className for wrapper */
  className?: string;
};

export default function TextBlockAnimation({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = "#000",
  duration = 0.8,
  className,
}: TextBlockAnimationProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const blockRef = useRef<HTMLSpanElement | null>(null);
  const contentRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !blockRef.current || !contentRef.current)
        return;

      gsap.set(blockRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(contentRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        delay,
        scrollTrigger: animateOnScroll
          ? {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          : undefined,
      });

      tl.to(blockRef.current, {
        scaleX: 1,
        duration,
        transformOrigin: "left center",
      })
        .set(contentRef.current, { opacity: 1 }, `<${duration / 2}`)
        .to(blockRef.current, {
          scaleX: 0,
          duration,
          transformOrigin: "right center",
        }, `<${duration * 0.4}`);
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay, blockColor, duration] }
  );

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ position: "relative", display: "inline-block" }}
    >
      <span ref={contentRef} style={{ position: "relative", zIndex: 1 }}>
        {children}
      </span>
      <span
        ref={blockRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: blockColor,
          zIndex: 2,
          pointerEvents: "none",
          transform: "scaleX(0)",
        }}
      />
    </span>
  );
}