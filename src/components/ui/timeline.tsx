"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import TextBlockAnimation from "@/components/text-block-animation";

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
    {
      dot: "bg-purple-500",
      date: "text-purple-500",
      title: "text-purple-600",
      wipe: "#a855f7",
    },
    { dot: "bg-pink-500", date: "text-pink-500", title: "text-pink-600", wipe: "#ec4899" },
    { dot: "bg-blue-400", date: "text-blue-400", title: "text-blue-500", wipe: "#60a5fa" },
    {
      dot: "bg-purple-500",
      date: "text-purple-500",
      title: "text-purple-600",
      wipe: "#a855f7",
    },
    { dot: "bg-pink-500", date: "text-pink-500", title: "text-pink-600", wipe: "#ec4899" },
    { dot: "bg-blue-400", date: "text-blue-400", title: "text-blue-500", wipe: "#60a5fa" },
  ] as const;
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rail, setRail] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Make the rail start/end at the first/last dot centers (not full content height),
    // so the grey line doesn't extend beyond the final node.
    const update = () => {
      // Anchor the rail to the dot *wrapper* (40px circle) for precise alignment.
      const dots = el.querySelectorAll<HTMLElement>("[data-timeline-dot]");
      if (dots.length === 0) {
        setRail({ top: 0, height: 0 });
        return;
      }

      const containerRect = el.getBoundingClientRect();
      const firstRect = dots[0].getBoundingClientRect();
      const lastRect = dots[dots.length - 1].getBoundingClientRect();

      const firstCenterY =
        firstRect.top - containerRect.top + firstRect.height / 2;
      const lastCenterY = lastRect.top - containerRect.top + lastRect.height / 2;

      const top = Math.max(0, firstCenterY);
      const height = Math.max(0, lastCenterY - firstCenterY);
      setRail({ top, height });
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

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, rail.height]
  );
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
                <TextBlockAnimation
                  blockColor="#6366f1"
                  animateOnScroll={false}
                  delay={0.05}
                  duration={0.6}
                >
                  {kicker}
                </TextBlockAnimation>
              </h2>
            )}
            {heading && (
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                <TextBlockAnimation
                  blockColor="#6366f1"
                  animateOnScroll={false}
                  delay={0.2}
                  duration={0.8}
                >
                  {heading}
                </TextBlockAnimation>
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
              <div
                data-timeline-dot
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center"
              >
                <div
                  className={`h-4 w-4 rounded-full ${
                    colors.dot
                  } border-2 border-white shadow-lg p-2`}
                />
              </div>
              <div className="hidden md:block md:pl-20">
                <h3 className={`text-xl md:text-3xl font-bold mb-1 ${colors.title}`}>
                  <TextBlockAnimation
                    blockColor={colors.wipe}
                    animateOnScroll={true}
                    delay={0}
                    duration={0.6}
                  >
                    {item.title}
                  </TextBlockAnimation>
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
                <h3 className={`text-2xl text-left font-bold mb-1 ${colorCycle[index % colorCycle.length].title}`}>
                  <TextBlockAnimation
                    blockColor={colorCycle[index % colorCycle.length].wipe}
                    animateOnScroll={true}
                    delay={0}
                    duration={0.6}
                  >
                    {item.title}
                  </TextBlockAnimation>
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
          style={{
            top: rail.top ? `${rail.top}px` : undefined,
            height: rail.height ? `${rail.height}px` : undefined,
          }}
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
