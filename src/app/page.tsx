"use client";

import LaserFlowLanding from "@/components/landing/LaserFlowLanding";
import LandingFeatures from "@/components/landing/LandingFeatures";
import PageLoader from "@/components/PageLoader";
import { StaggerTestimonials } from "@/components/Testimonial";

export default function Home() {
  return (
    <PageLoader>
      <LaserFlowLanding />
      <LandingFeatures />
      <StaggerTestimonials />
    </PageLoader>
  );
}
