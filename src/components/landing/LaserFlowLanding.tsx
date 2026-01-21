"use client";

import { useRef } from "react";
import Link from "next/link";
import { Shield, ArrowRight, Lock, Eye, FileText } from "lucide-react";
import LaserFlow from "@/components/LaserFlow";

export default function LaserFlowLanding() {
  const revealImgRef = useRef<HTMLImageElement | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "visible",
        backgroundColor: "#060010",
        paddingBottom: "10rem",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty("--mx", `${x}px`);
          el.style.setProperty("--my", `${y + rect.height * 0.5}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty("--mx", "-9999px");
          el.style.setProperty("--my", "-9999px");
        }
      }}
    >
      {/* @ts-ignore - LaserFlow is a JSX component with flexible props */}
      <LaserFlow
        horizontalBeamOffset={0.1}
        verticalBeamOffset={0.0}
        color="#4fbcf3"
        horizontalSizing={0.9}
        verticalSizing={5}
        wispDensity={1}
        wispSpeed={15}
        wispIntensity={5}
        flowSpeed={0.35}
        flowStrength={0.25}
        fogIntensity={0.45}
        fogScale={0.3}
        fogFallSpeed={0.6}
        decay={1.1}
        falloffStart={1.2}
      />

      <div
        style={{
          position: "absolute",
          top: "41%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "86%",
          maxWidth: "1200px",
          backgroundColor: "#060010",
          borderRadius: "20px",
          border: "2px solid #4fbcf3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          zIndex: 6,
          padding: "3rem 2rem",
          marginBottom: "5rem",
        }}
      >
        <div style={{ textAlign: "center", width: "100%" }}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: "bold", color: "#4fbcf3", marginBottom: "1.5rem", lineHeight: "1.2" }}>
            Cyber Security Hub
          </h1>

          <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.9)", marginBottom: "2rem", maxWidth: "700px", margin: "0 auto 2rem", lineHeight: "1.6" }}>
            Learn, practice, and master cybersecurity. Explore roadmaps, read the latest news, and stay aware of common threats.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            <Link href="/roadmap">
              <button style={{ 
                padding: "0.875rem 2rem", 
                borderRadius: "9999px", 
                backgroundColor: "#4fbcf3", 
                color: "#060010", 
                border: "none", 
                fontSize: "1rem", 
                fontWeight: "bold",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s"
              }}>
                <Lock style={{ width: "18px", height: "18px" }} />
                View Roadmap
                <ArrowRight style={{ width: "18px", height: "18px" }} />
              </button>
            </Link>
            <Link href="/news">
              <button style={{ 
                padding: "0.875rem 2rem", 
                borderRadius: "9999px", 
                backgroundColor: "transparent", 
                color: "#4fbcf3", 
                border: "2px solid #4fbcf3", 
                fontSize: "1rem", 
                fontWeight: "bold",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s"
              }}>
                <Eye style={{ width: "18px", height: "18px" }} />
                Latest News
              </button>
            </Link>
            <Link href="/awareness">
              <button style={{ 
                padding: "0.875rem 2rem", 
                borderRadius: "9999px", 
                backgroundColor: "transparent", 
                color: "#4fbcf3", 
                border: "2px solid #4fbcf3", 
                fontSize: "1rem", 
                fontWeight: "bold",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s"
              }}>
                <Shield style={{ width: "18px", height: "18px" }} />
                Awareness
              </button>
            </Link>
            <Link href="/blog">
              <button style={{ 
                padding: "0.875rem 2rem", 
                borderRadius: "9999px", 
                backgroundColor: "transparent", 
                color: "#4fbcf3", 
                border: "2px solid #4fbcf3", 
                fontSize: "1rem", 
                fontWeight: "bold",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s"
              }}>
                <FileText style={{ width: "18px", height: "18px" }} />
                Blog
              </button>
            </Link>
          </div>
        </div>
      </div>

      <img
        ref={revealImgRef}
        src="/path/to/image.jpg"
        alt="Reveal effect"
        style={{
          position: "absolute",
          width: "100%",
          top: "-50%",
          zIndex: 5,
          mixBlendMode: "lighten",
          opacity: 0.3,
          pointerEvents: "none",
          ["--mx" as any]: "-9999px",
          ["--my" as any]: "-9999px",
          WebkitMaskImage:
            "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
          maskImage:
            "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
