'use client';

import * as React from 'react';

import { Timeline } from '@/components/ui/timeline';
import CyberSecurityRoadmapDiagram from "@/components/roadmap/CyberSecurityRoadmapDiagram";

export default function TimelineRoadmapPage() {
  const data = [
    {
      title: 'Start Here',
      date: 'Day 1 (30–45 min)',
      content: (
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-900 text-lg md:text-xl font-bold mb-4">
            Set up your learning “lab”
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
            Start <span className="font-semibold text-purple-600">safe</span> and{" "}
            <span className="font-semibold text-pink-600">legal</span>. A clean
            environment + a simple routine will keep you consistent.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm md:text-base">
            <li>
              Install a <span className="font-semibold text-blue-500">Linux VM</span>{" "}
              and keep it updated.
            </li>
            <li>
              Create a dedicated <span className="font-semibold text-pink-600">browser profile</span>{" "}
              for security learning.
            </li>
            <li>
              Write notes daily: <span className="font-semibold text-purple-600">try → observe → learn</span>.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Internet & Web Basics',
      date: 'Week 1',
      content: (
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-900 text-lg md:text-xl font-bold mb-4">
            Understand how websites really work
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
            Most security issues are broken assumptions in{" "}
            <span className="font-semibold text-blue-500">requests</span>,{" "}
            <span className="font-semibold text-pink-600">sessions</span>, and{" "}
            <span className="font-semibold text-purple-600">permissions</span>.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm md:text-base">
            <li>
              <span className="font-semibold">HTTP</span>: methods, status codes, headers.
            </li>
            <li>
              <span className="font-semibold">Cookies/Sessions</span>: how login “stays logged in”.
            </li>
            <li>
              <span className="font-semibold">DNS + HTTPS/TLS</span>: what they do (and don’t).
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Linux + Networking',
      date: 'Week 2',
      content: (
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-900 text-lg md:text-xl font-bold mb-4">
            Learn the tools that every security role uses
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
            Become comfortable with <span className="font-semibold text-purple-600">commands</span>,{" "}
            <span className="font-semibold text-pink-600">permissions</span>, and{" "}
            <span className="font-semibold text-blue-500">network traffic</span>.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm md:text-base">
            <li>Linux: users, groups, permissions, processes, services.</li>
            <li>Networking: ports, TCP vs UDP, DNS, TLS.</li>
            <li>Practice: <code className="font-mono">curl</code>, <code className="font-mono">nslookup</code>, <code className="font-mono">ss</code>.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Start with OWASP',
      date: 'Week 3',
      content: (
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-900 text-lg md:text-xl font-bold mb-4">
            Learn common vulnerability patterns (OWASP)
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
            Learn the pattern: <span className="font-semibold text-blue-500">why</span> it happens,{" "}
            <span className="font-semibold text-pink-600">how</span> it’s exploited, and{" "}
            <span className="font-semibold text-purple-600">how</span> it’s prevented.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm md:text-base">
            <li>Broken access control and authentication mistakes.</li>
            <li>Injection basics (SQLi concept, command injection concept).</li>
            <li>Write a short “prevention checklist” for each topic.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Build 2 Projects',
      date: 'Month 1',
      content: (
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-900 text-lg md:text-xl font-bold mb-4">
            Build projects (proof beats certificates)
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
            Two small projects are better than ten half-finished ones. Show{" "}
            <span className="font-semibold text-pink-600">clear UX</span> and{" "}
            <span className="font-semibold text-purple-600">clear explanations</span>.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm md:text-base">
            <li>Project 1: Fraud awareness + “what to do next” flow.</li>
            <li>Project 2: Cyber news feed + short summaries + impact.</li>
            <li>Write-ups: threat → impact → prevention → checklist.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Pick a Track',
      date: 'Month 2+',
      content: (
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-900 text-lg md:text-xl font-bold mb-4">
            Specialize: pick a direction
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
            Choose what feels fun, then go deep with{" "}
            <span className="font-semibold text-blue-500">tools</span> +{" "}
            <span className="font-semibold text-purple-600">practice</span>.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm md:text-base">
            <li>AppSec: APIs, authz, secure coding, testing.</li>
            <li>Blue Team: logs, detections, incidents, basic SIEM.</li>
            <li>Cloud: IAM, network controls, secrets, posture.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white">
      <Timeline
        kicker="Cybersecurity Roadmap"
        heading="How it Works"
        data={data}
      />
      <CyberSecurityRoadmapDiagram />
    </div>
  );
}

