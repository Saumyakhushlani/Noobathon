'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Lenis from '@studio-freight/lenis';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

export default function Gallery() {
  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      // lenis has a destroy method in v1.x
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (lenis as any)?.destroy?.();
    };
  }, []);

  const images = [
    { src: '/images/10259117.jpg', alt: 'Cyber security visual 1' },
    { src: '/images/10281182.jpg', alt: 'Cyber security visual 2' },
    { src: '/images/5566179.jpg', alt: 'Cyber security visual 5' },
    { src: '/images/7373068.jpg', alt: 'Cyber security visual 6' },
    { src: '/images/4560.jpg', alt: 'Cyber security visual 4' },
    { src: '/images/1807_i402_018_s.jpg', alt: 'Cyber security visual 3' },
  ];

  return (
    <main className=" w-full">
      <div className="relative flex h-[50vh] items-center justify-center">
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
            'blur-[30px]'
          )}
        />
      </div>
      <ZoomParallax images={images} />
    </main>
  );
}

