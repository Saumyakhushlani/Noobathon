"use client";

import Link from "next/link";
import { Shield, ArrowRight, Lock, Eye, FileText } from "lucide-react";
import Hyperspeed from "@/components/Hyperspeed";
import { useThemeStore } from "@/store/theme";

export default function LaserFlowLanding() {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  // Theme-aware colors for Hyperspeed
  const colors = isDark
    ? {
        // Dark mode colors (original)
        roadColor: 526344,
        islandColor: 657930,
        background: 0,
        shoulderLines: 1250072,
        brokenLines: 1250072,
        leftCars: [14177983, 6770850, 12732332],
        rightCars: [14177983, 6770850, 12732332],
        sticks: 1250072
      }
    : {
        // Light mode colors (lighter, more visible)
        roadColor: 14737632, // Light gray road (0xE0E0E0)
        islandColor: 13684944, // Slightly darker gray island (0xD0D0D0)
        background: 16777215, // White background (0xFFFFFF)
        shoulderLines: 3355443, // Dark gray lines (0x333333)
        brokenLines: 3355443, // Dark gray broken lines (0x333333)
        leftCars: [3898046, 2443755, 1924568], // Blue cars for visibility (0x3B82F6, 0x2563EB, 0x1D4ED8)
        rightCars: [3898046, 2443755, 1924568], // Blue cars
        sticks: 3898046 // Blue sticks (0x3B82F6)
      };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-background dark:!bg-black flex items-center justify-center py-8 sm:py-12 md:py-0"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ height: '100vh' }}>
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => {},
            onSlowDown: () => {},
            distortion: "turbulentDistortion",
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [12, 80],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: colors
          }}
        />
      </div>

      <div className="relative z-10 text-center w-full px-4 sm:px-6 md:px-8">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight text-gray-900 dark:text-white drop-shadow-lg dark:drop-shadow-none"
        >
          Cyber Security Hub
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-7 md:mb-8 max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
          Learn, practice, and master cybersecurity. Explore roadmaps, read the latest news, and stay aware of common threats.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center flex-wrap px-2">
          <Link href="/roadmap" className="w-full sm:w-auto">
            <button 
              className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm sm:text-base font-bold cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 border-2 border-blue-400/30 hover:border-blue-300/50"
            >
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>View Roadmap</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Link>
          <Link href="/news" className="w-full sm:w-auto">
            <button 
              className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-sm text-white text-sm sm:text-base font-bold cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-700 hover:scale-105 active:scale-95 border-2 border-blue-500/50 hover:border-blue-400/70 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Latest News</span>
            </button>
          </Link>
          <Link href="/awareness" className="w-full sm:w-auto">
            <button 
              className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-sm text-white text-sm sm:text-base font-bold cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-700 hover:scale-105 active:scale-95 border-2 border-blue-500/50 hover:border-blue-400/70 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Awareness</span>
            </button>
          </Link>
          <Link href="/blog" className="w-full sm:w-auto">
            <button 
              className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-sm text-white text-sm sm:text-base font-bold cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-700 hover:scale-105 active:scale-95 border-2 border-blue-500/50 hover:border-blue-400/70 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Blog</span>
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}
