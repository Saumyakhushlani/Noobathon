"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/theme';

const SQRT_5000 = Math.sqrt(5000);

const baseTestimonials = [
  {
    quote:
      "Security is a process, not a product.",
    name: "Bruce Schneier",
    affiliation: "Cryptographer & Author (Applied Cryptography)",
    image: "https://www.schneier.com/photo/",
  },
  {
    quote:
      "The only truly secure system is one that is powered off, cast in a block of concrete, and sealed in a lead-lined room with armed guards — and even then I have my doubts.",
    name: "Gene Spafford",
    affiliation: "Computer Security Pioneer, Purdue CERIAS",
    image: "https://spaf.cerias.purdue.edu/quotes.html",
  },
  {
    quote:
      "Probably the biggest threat is people thinking that they can buy broken things and then put patches on afterward and make it secure.",
    name: "Gene Spafford",
    affiliation: "Computer Security Pioneer, Purdue CERIAS",
    image: "https://spaf.cerias.purdue.edu/quotes.html",
  },
  {
    quote:
      "Security is not an afterthought; it must be part of the product lifecycle from day one.",
    name: "Gary McGraw",
    affiliation: "Software Security Expert & Author",
    image: "https://www.synopsys.com/content/dam/synopsys/company/about/bio-pdfs/gary-mcgraw-bio-2017.pdf",
  },
  {
    quote:
      "In computer security, ‘trusted’ means this piece of code is capable of destroying my whole security integrity.",
    name: "Joanna Rutkowska",
    affiliation: "Founder of Qubes OS, Security Researcher",
    image: "https://www.qubes-os.org/news/2017/12/11/joanna-rutkowska-black-hat-europe-2017/",
  },
  {
    quote:
      "Nothing connected to the internet is truly safe — security by design is the only realistic approach.",
    name: "Mikko Hyppönen",
    affiliation: "Security Researcher & Author (F-Secure)",
    image: "https://www.gettyimages.in/photos/mikko-hypponen",
  },
  {
    quote:
      "The best defense is understanding how attackers think — security is mindset first, tools later.",
    name: "Kevin Mitnick",
    affiliation: "Author (The Art of Deception)",
    image: "https://www.gettyimages.in/photos/kevin-mitnick",
  },
  {
    quote:
      "Cybercrime thrives where security is ignored, and disappears where transparency is forced.",
    name: "Brian Krebs",
    affiliation: "Investigative Journalist (KrebsOnSecurity)",
    image: "https://en.wikipedia.org/wiki/Brian_Krebs",
  },
];

// Create testimonials with theme indices for the stagger effect
const testimonials = baseTestimonials.map((testimonial, index) => ({
  ...testimonial,
  tempId: index,
  themeIndex: index % 3
}));

// Theme colors: purple, pink, blue
const getThemeColor = (themeIndex) => {
  const themes = [
    { bg: "bg-purple-500", border: "border-purple-500", text: "text-white", shadow: "rgb(168, 85, 247)" },
    { bg: "bg-pink-500", border: "border-pink-500", text: "text-white", shadow: "rgb(236, 72, 153)" },
    { bg: "bg-blue-500", border: "border-blue-500", text: "text-white", shadow: "rgb(59, 130, 246)" },
  ];
  return themes[themeIndex % 3];
};

const TestimonialCard = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;
  const themeColor = getThemeColor(testimonial.themeIndex || 0);

  return (
    <div
      onClick={() => {
        if (position !== 0) {
          handleMove(position);
        }
      }}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-700 ease-in-out backdrop-blur-sm",
        isCenter 
          ? `${themeColor.bg} ${themeColor.text} ${themeColor.border} z-10` 
          : "z-0 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${isCenter ? 1 : 0.9})
        `,
        opacity: Math.abs(position) > 2 ? 0.3 : isCenter ? 1 : 0.7,
        boxShadow: isCenter ? `0px 8px 0px 4px ${themeColor.shadow}` : "0px 0px 0px 0px transparent",
        willChange: "transform, opacity",
      }}>
      <span
        className="absolute block origin-top-right rotate-45 bg-gray-300"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }} />
      {testimonial.image && (
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="mb-4 h-14 w-12 bg-gray-200 object-cover object-top rounded"
          style={{
            boxShadow: "3px 3px 0px white"
          }} />
      )}
      <h3
        className={cn(
          "text-base sm:text-xl font-medium",
          isCenter ? themeColor.text : "text-gray-900 dark:text-white"
        )}>
        "{testimonial.quote}"
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-white/80" : "text-gray-600 dark:text-gray-300"
        )}>
        - {testimonial.name}, {testimonial.affiliation}
      </p>
    </div>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  // Get visible testimonials in a circular manner
  const getVisibleTestimonials = () => {
    const visibleCount = 5; // Show 5 cards at a time
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({
        ...testimonials[index],
        tempId: testimonials[index].tempId, // Use stable ID from base testimonial
        displayIndex: i, // Track position for animation
      });
    }
    return visible;
  };

  const handleMove = (steps) => {
    setCurrentIndex((prevIndex) => {
      // Circular loop: wrap around smoothly
      const newIndex = prevIndex + steps;
      if (newIndex < 0) {
        return testimonials.length + newIndex;
      }
      return newIndex % testimonials.length;
    });
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-black py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-purple-600 dark:text-purple-400 text-lg font-medium mb-2">Expert Insights</p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Wisdom from Cybersecurity Leaders
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Learn from the pioneers and experts who have shaped the world of information security
          </p>
          <div className="flex justify-center">
            <svg
              className="w-32 h-2 text-pink-400 dark:text-pink-500"
              viewBox="0 0 128 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2C18 1, 38 3, 54 2C70 1, 90 3, 106 2C114 1.5, 122 2, 126 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Testimonials Section */}
        <div
          className="relative w-full overflow-hidden bg-gray-50 dark:bg-black"
          style={{ height: 600 }}>
      {getVisibleTestimonials().map((testimonial, index) => {
        const position = index - 2; // Center card is at position 0
        // Use slot position as key to maintain component identity for smooth transitions
        return (
          <TestimonialCard
            key={`slot-${index}`}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize} />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white dark:bg-black/50 border-2 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white",
            "hover:bg-gray-800 dark:hover:bg-white/10 hover:text-white dark:hover:text-white hover:border-gray-800 dark:hover:border-white/20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-white/20 focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial">
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white dark:bg-black/50 border-2 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white",
            "hover:bg-gray-800 dark:hover:bg-white/10 hover:text-white dark:hover:text-white hover:border-gray-800 dark:hover:border-white/20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-white/20 focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial">
          <ChevronRight />
        </button>
      </div>
      </div>
    </div>
    </div>
  );
};
