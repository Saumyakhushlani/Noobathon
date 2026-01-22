import { ReactNode } from "react";

export const metadata = {
  title: "Cybersecurity Roadmap | Learn Path & Skills",
  description: "Explore a comprehensive cybersecurity learning roadmap. Master information security skills, understand career paths, and track your progress in cybersecurity education.",
  keywords: ["cybersecurity roadmap", "cyber security career", "security training path", "cybersecurity skills", "information security learning", "cyber security education"],
  openGraph: {
    title: "Cybersecurity Roadmap | Learn Path & Skills",
    description: "Explore a comprehensive cybersecurity learning roadmap. Master information security skills and understand career paths.",
    type: "website",
    url: "/roadmap",
    siteName: "Cyber Security Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Roadmap | Learn Path & Skills",
    description: "Explore a comprehensive cybersecurity learning roadmap. Master information security skills and understand career paths.",
  },
  alternates: {
    canonical: "/roadmap",
  },
};

export default function RoadmapLayout({ children }: { children: ReactNode }) {
  return children;
}
