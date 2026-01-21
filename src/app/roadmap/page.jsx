import RoadmapIntro from '@/components/roadmap/RoadmapIntro';
import TimelineRoadmapPage from '@/components/roadmap/TimelineRoadmapPage';
import CyberSecurityRoadmapDiagram from '@/components/roadmap/CyberSecurityRoadmapDiagram';

export default function Page() {
  return (
    <>
      <RoadmapIntro />
      <TimelineRoadmapPage />
      <CyberSecurityRoadmapDiagram />
    </>
  );
}
