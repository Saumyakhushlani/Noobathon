"use client";

import RoadmapIntro from '@/components/roadmap/RoadmapIntro';
import TimelineRoadmapPage from '@/components/roadmap/TimelineRoadmapPage';
import CyberSecurityRoadmapDiagram from '@/components/roadmap/CyberSecurityRoadmapDiagram';
import PageLoader from '@/components/PageLoader';

export default function Page() {
  return (
    <PageLoader>
      <RoadmapIntro />
      <TimelineRoadmapPage />
      <CyberSecurityRoadmapDiagram />
    </PageLoader>
  );
}
