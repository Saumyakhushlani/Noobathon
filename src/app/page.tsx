"use client";

import LaserFlowLanding from "@/components/landing/LaserFlowLanding";
import LandingFeatures from "@/components/landing/LandingFeatures";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <PageLoader>
      <LaserFlowLanding />
      <LandingFeatures />
    </PageLoader>
  );
}
