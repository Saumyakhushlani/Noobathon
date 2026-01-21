"use client";

import * as React from "react";
import { Shield, Network, Lock, Eye, Code, Globe, AlertTriangle } from "lucide-react";
import { useThemeStore } from "@/store/theme";

export default function RoadmapIntro() {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  const topics = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "What is Cybersecurity?",
      description:
        "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "What is Networking?",
      description:
        "Networking is the practice of connecting computers and devices to share resources and information. Understanding networking fundamentals like TCP/IP, DNS, routing, and protocols is essential for cybersecurity professionals to identify and defend against network-based attacks.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Why Learn Cybersecurity?",
      description:
        "With increasing cyber threats and data breaches, cybersecurity skills are in high demand. Learning cybersecurity helps you protect organizations, understand attack vectors, and build a rewarding career in one of the fastest-growing tech fields.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Threat Detection",
      description:
        "Threat detection involves identifying malicious activities and potential security breaches in systems and networks. This includes monitoring for suspicious patterns, analyzing logs, and using security tools to detect anomalies before they cause damage.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Security Programming",
      description:
        "Security programming involves writing secure code, understanding vulnerabilities, and implementing security controls. Knowledge of programming languages like Python, JavaScript, and understanding secure coding practices is crucial for building and securing applications.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Web Security",
      description:
        "Web security focuses on protecting websites and web applications from threats like SQL injection, XSS attacks, and CSRF. Understanding web technologies, authentication mechanisms, and secure communication protocols is essential for web security professionals.",
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Information Security & Awareness",
      description:
        "Information security awareness involves educating individuals and organizations about cybersecurity threats, best practices, and preventive measures. It includes understanding phishing attacks, password security, data protection, social engineering, and creating a security-conscious culture to prevent breaches.",
      color: "from-red-500 to-orange-500",
    },
  ];

  return (
    <section
      className="w-full py-12 mt-8 md:py-16 lg:py-20 bg-[#171717] dark:bg-[#171717]"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="text-center mb-12">
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Cybersecurity Fundamentals
          </h1>
          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Build a strong foundation in cybersecurity concepts, networking, and security practices
            before diving into advanced topics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isDark
                  ? "bg-[#1f1f1f] border-gray-700 hover:border-gray-600"
                  : "bg-white border-gray-200 hover:border-gray-300 shadow-md"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <div className="relative">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-gradient-to-br ${topic.color} text-white`}
                >
                  {topic.icon}
                </div>
                <h3
                  className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                >
                  {topic.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
