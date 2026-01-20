"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: React.ReactNode;
  date?: React.ReactNode;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  kicker,
  heading,
}: {
  data: TimelineEntry[];
  kicker?: React.ReactNode;
  heading?: React.ReactNode;
}) => {
  const colorCycle = [
    { dot: "bg-purple-500", date: "text-purple-500" },
    { dot: "bg-pink-500", date: "text-pink-500" },
    { dot: "bg-blue-400", date: "text-blue-400" },
    { dot: "bg-purple-500", date: "text-purple-500" },
    { dot: "bg-pink-500", date: "text-pink-500" },
    { dot: "bg-blue-400", date: "text-blue-400" },
  ] as const;
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Make rail end at the last item (avoid overshooting due to padding).
    const update = () => {
      const styles = window.getComputedStyle(el);
      const paddingBottom = Number.parseFloat(styles.paddingBottom || "0") || 0;
      setHeight(Math.max(0, el.scrollHeight - paddingBottom));
    };
    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Finish later so the progress doesn't feel "too fast"
    offset: ["start 10%", "end 90%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white font-sans md:px-10"
      ref={containerRef}
    >
      {(kicker || heading) && (
        <div className="max-w-7xl mx-auto pt-20 pb-0 px-4 md:px-8 lg:px-10">
          <div className="text-center mb-0">
            {kicker && (
              <h2 className="text-lg md:text-2xl font-semibold text-purple-600 mb-2">
                {kicker}
              </h2>
            )}
            {heading && (
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {heading}
              </h1>
            )}
          </div>
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-start md:gap-10 ${
              index === 0 ? "pt-0 md:pt-0" : "pt-10 md:pt-40"
            }`}
          >
            {(() => {
              const colors = colorCycle[index % colorCycle.length];
              return (
            <div className="sticky flex flex-col md:flex-row z-40 items-start top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                <div
                  className={`h-4 w-4 rounded-full ${
                    colors.dot
                  } border-2 border-white shadow-lg p-2`}
                />
              </div>
              <div className="hidden md:block md:pl-20">
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-1">
                  {item.title}
                </h3>
                {item.date && (
                  <p className={`${colors.date} text-sm md:text-base font-medium`}>
                    {item.date}
                  </p>
                )}
              </div>
            </div>
              );
            })()}

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <div className="md:hidden block mb-4">
                <h3 className="text-2xl text-left font-bold text-gray-900 mb-1">
                  {item.title}
                </h3>
                {item.date && (
                  <p
                    className={`${
                      colorCycle[index % colorCycle.length].date
                    } text-sm font-medium`}
                  >
                    {item.date}
                  </p>
                )}
              </div>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          className="absolute md:left-8 left-8 top-0 w-[2px] bg-gray-300"
          style={{ height: height ? `${height}px` : undefined }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-pink-500 to-blue-400 from-[0%] via-[45%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
