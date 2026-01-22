"use client";

import { useState, useRef, useEffect } from "react";
import { useThemeStore } from "@/store/theme";

interface Ripple {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export default function InteractiveGridBackground() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  const gridSize = 50; // Size of each grid cell
  const [gridCells, setGridCells] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateGrid = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      const cells: { x: number; y: number }[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          cells.push({ x: col * gridSize, y: row * gridSize });
        }
      }
      setGridCells(cells);
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, [gridSize]);

  const handleInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      x,
      y,
      id: rippleIdRef.current++,
      timestamp: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      onMouseMove={handleInteraction}
      onClick={handleInteraction}
      style={{ pointerEvents: "auto" }}
    >
      {/* Grid Lines */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isDark ? 0.2 : 0.15,
          backgroundImage: isDark
            ? `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `
            : `
              linear-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.12) 1px, transparent 1px)
            `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Interactive Grid Cells */}
      {gridCells.map((cell, index) => (
        <div
          key={index}
          className={`absolute border transition-all duration-300 ${
            isDark
              ? "border-white/5 hover:border-white/20 hover:bg-white/5"
              : "border-gray-300/20 hover:border-gray-400/40 hover:bg-gray-100/30"
          }`}
          style={{
            left: `${cell.x}px`,
            top: `${cell.y}px`,
            width: `${gridSize}px`,
            height: `${gridSize}px`,
          }}
        />
      ))}

      {/* Ripple Effects */}
      {ripples.map((ripple) => {
        const age = Date.now() - ripple.timestamp;
        const progress = Math.min(age / 1000, 1);
        const scale = progress * 3;
        const opacity = 1 - progress;

        return (
          <div
            key={ripple.id}
            className={`absolute pointer-events-none rounded-full border-2 ${
              isDark ? "border-white/40" : "border-gray-400/40"
            }`}
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              width: "4px",
              height: "4px",
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: opacity * 0.6,
              transition: "opacity 0.1s ease-out",
            }}
          />
        );
      })}
    </div>
  );
}
