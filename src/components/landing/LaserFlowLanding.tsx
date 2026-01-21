"use client";

import Link from "next/link";
import { Shield, ArrowRight, Lock, Eye, FileText } from "lucide-react";
import LaserFlow from "@/components/LaserFlow";
import { useThemeStore } from "@/store/theme";

export default function LaserFlowLanding() {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";
  
  // Different color scheme for light mode - using light blue
  const laserFlowColor = isDark ? "#4fbcf3" : "#60a5fa";
  
  // Adjust intensity for light mode to be more subtle
  const wispIntensity = isDark ? 5 : 3;
  const fogIntensity = isDark ? 0.45 : 0.25;
  const flowStrength = isDark ? 0.25 : 0.15;

  return (
    <div
      className="min-h-screen relative overflow-visible bg-background dark:!bg-black pb-16 sm:pb-24 md:pb-32"
    >
      {/* @ts-ignore - LaserFlow is a JSX component with flexible props */}
      <LaserFlow
        horizontalBeamOffset={0.1}
        verticalBeamOffset={0.0}
        color={laserFlowColor}
        horizontalSizing={0.9}
        verticalSizing={5}
        wispDensity={1}
        wispSpeed={15}
        wispIntensity={wispIntensity}
        flowSpeed={0.35}
        flowStrength={flowStrength}
        fogIntensity={fogIntensity}
        fogScale={0.3}
        fogFallSpeed={0.6}
        decay={1.1}
        falloffStart={1.2}
      />

      <div
        className="absolute left-1/2 -translate-x-1/2 w-[90%] sm:w-[86%] max-w-[1200px] bg-card dark:bg-[#060010] rounded-[20px] border-2 flex items-center justify-center text-foreground dark:text-white z-[6] px-4 py-6 sm:px-8 sm:py-12 md:px-12 md:py-16 mb-12 sm:mb-20"
        style={{
          top: "clamp(35%, 41%, 45%)",
          borderColor: isDark ? "#4fbcf3" : "#60a5fa",
        }}
      >
        <div className="text-center w-full">
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold mb-4 sm:mb-6 leading-tight"
            style={{
              color: isDark ? "#4fbcf3" : "#60a5fa",
            }}
          >
            Cyber Security Hub
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.3rem] text-foreground/90 dark:text-white/90 mb-6 sm:mb-8 max-w-[700px] mx-auto leading-relaxed px-2">
            Learn, practice, and master cybersecurity. Explore roadmaps, read the latest news, and stay aware of common threats.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center flex-wrap mb-6 sm:mb-8 px-2">
            <Link href="/roadmap" className="w-full sm:w-auto">
              <button 
                className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-full text-white border-none text-sm sm:text-base font-bold cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: isDark ? "#4fbcf3" : "#60a5fa",
                  color: isDark ? "#060010" : "#ffffff",
                }}
              >
                <Lock className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="whitespace-nowrap">View Roadmap</span>
                <ArrowRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>
            </Link>
            <Link href="/news" className="w-full sm:w-auto">
              <button 
                className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-full bg-transparent text-sm sm:text-base font-bold cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  color: isDark ? "#4fbcf3" : "#60a5fa",
                  borderColor: isDark ? "#4fbcf3" : "#60a5fa",
                  borderWidth: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "rgba(79, 188, 243, 0.1)" : "rgba(96, 165, 250, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Eye className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="whitespace-nowrap">Latest News</span>
              </button>
            </Link>
            <Link href="/awareness" className="w-full sm:w-auto">
              <button 
                className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-full bg-transparent text-sm sm:text-base font-bold cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  color: isDark ? "#4fbcf3" : "#60a5fa",
                  borderColor: isDark ? "#4fbcf3" : "#60a5fa",
                  borderWidth: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "rgba(79, 188, 243, 0.1)" : "rgba(96, 165, 250, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Shield className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="whitespace-nowrap">Awareness</span>
              </button>
            </Link>
            <Link href="/blog" className="w-full sm:w-auto">
              <button 
                className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-full bg-transparent text-sm sm:text-base font-bold cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  color: isDark ? "#4fbcf3" : "#60a5fa",
                  borderColor: isDark ? "#4fbcf3" : "#60a5fa",
                  borderWidth: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "rgba(79, 188, 243, 0.1)" : "rgba(96, 165, 250, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <FileText className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="whitespace-nowrap">Blog</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
