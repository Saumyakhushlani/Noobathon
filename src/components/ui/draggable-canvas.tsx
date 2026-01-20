"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type DraggableCanvasProps = {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  /** initial pan */
  initial?: { x: number; y: number };
};

export default function DraggableCanvas({
  className,
  innerClassName,
  children,
  initial = { x: 0, y: 0 },
}: DraggableCanvasProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = React.useState(initial);
  const drag = React.useRef<{
    active: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    pointerId: number | null;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    pointerId: null,
  });

  function isInteractiveTarget(target: HTMLElement | null) {
    if (!target) return false;
    return Boolean(
      target.closest("button,a,input,textarea,select,[role='button']")
    );
  }

  function onPointerDown(e: React.PointerEvent) {
    if (isInteractiveTarget(e.target as HTMLElement | null)) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
      pointerId: e.pointerId,
    };
    ref.current?.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    setPos({ x: drag.current.originX + dx, y: drag.current.originY + dy });
  }

  function endDrag() {
    drag.current.active = false;
    if (drag.current.pointerId != null) {
      try {
        ref.current?.releasePointerCapture(drag.current.pointerId);
      } catch {}
    }
    drag.current.pointerId = null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white",
        "touch-none select-none",
        className
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <div
        className={cn("absolute inset-0", innerClassName)}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

