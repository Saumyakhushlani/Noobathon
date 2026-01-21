"use client";

import Link from "next/link";
import { BookOpen, TrendingUp, AlertTriangle, FileText, ArrowRight } from "lucide-react";

export default function LandingFeatures() {
  return (
    <div
      className="bg-background dark:!bg-black"
      style={{
        padding: "5rem 2rem",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", width: "100%" }}>
          <h2
            className="text-[#4fbcf3] dark:text-[#4fbcf3] text-foreground dark:text-[#4fbcf3]"
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "1rem",
              width: "100%",
            }}
          >
            Everything You Need to Master Cybersecurity
          </h2>

          <p
            className="text-foreground/80 dark:text-white/80"
            style={{
              fontSize: "1.2rem",
              textAlign: "center",
              marginBottom: "4rem",
              maxWidth: "700px",
              margin: "0 auto 4rem",
            }}
          >
            Comprehensive resources to learn, stay updated, and protect yourself in the digital world.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          <div
            className="bg-card dark:bg-[rgba(79,188,243,0.05)] border-[rgba(79,188,243,0.3)] dark:border-[rgba(79,188,243,0.3)]"
            style={{
              padding: "2rem",
              borderRadius: "16px",
              border: "2px solid",
              transition: "all 0.3s",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
              <BookOpen
                className="text-[#4fbcf3] dark:text-[#4fbcf3]"
                style={{
                  width: "48px",
                  height: "48px",
                  marginBottom: "1.5rem",
                }}
              />
              <h3
                className="text-[#4fbcf3] dark:text-[#4fbcf3]"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                Learn
              </h3>
              <p
                className="text-foreground/80 dark:text-white/80"
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.7",
                  marginBottom: "1.5rem",
                  flexGrow: 1,
                }}
              >
                Structured cybersecurity roadmaps covering fundamentals to advanced topics. From
                network security to ethical hacking, master the skills you need to excel in
                cybersecurity. Our comprehensive guides take you from beginner to expert with
                hands-on practice and real-world scenarios.
              </p>
              <Link href="/roadmap">
                <button
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                    color: "#4fbcf3",
                    border: "1px solid #4fbcf3",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s",
                    width: "fit-content",
                  }}
                >
                  Explore Roadmaps
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </button>
              </Link>
            </div>

          <div
            className="bg-card dark:bg-[rgba(79,188,243,0.05)] border-[rgba(79,188,243,0.3)] dark:border-[rgba(79,188,243,0.3)]"
            style={{
              padding: "2rem",
              borderRadius: "16px",
              border: "2px solid",
              transition: "all 0.3s",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
              <TrendingUp
                className="text-[#4fbcf3] dark:text-[#4fbcf3]"
                style={{
                  width: "48px",
                  height: "48px",
                  marginBottom: "1.5rem",
                }}
              />
              <h3
                className="text-[#4fbcf3] dark:text-[#4fbcf3]"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                Stay Updated
              </h3>
              <p
                className="text-foreground/80 dark:text-white/80"
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.7",
                  marginBottom: "1.5rem",
                  flexGrow: 1,
                }}
              >
                Latest security news, vulnerabilities, and threat intelligence. Stay ahead of
                emerging risks with real-time updates on cyber attacks, data breaches, and security
                patches. Our curated news feed keeps you informed about the ever-evolving threat
                landscape and industry best practices.
              </p>
              <Link href="/news">
                <button
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                    color: "#4fbcf3",
                    border: "1px solid #4fbcf3",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s",
                    width: "fit-content",
                  }}
                >
                  Read Latest News
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </button>
              </Link>
            </div>

          <div
            className="bg-card dark:bg-[rgba(79,188,243,0.05)] border-[rgba(79,188,243,0.3)] dark:border-[rgba(79,188,243,0.3)]"
            style={{
              padding: "2rem",
              borderRadius: "16px",
              border: "2px solid",
              transition: "all 0.3s",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
              <AlertTriangle
                className="text-[#4fbcf3] dark:text-[#4fbcf3]"
                style={{
                  width: "48px",
                  height: "48px",
                  marginBottom: "1.5rem",
                }}
              />
              <h3
                className="text-[#4fbcf3] dark:text-[#4fbcf3]"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                Protect
              </h3>
              <p
                className="text-foreground/80 dark:text-white/80"
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.7",
                  marginBottom: "1.5rem",
                  flexGrow: 1,
                }}
              >
                Common scams, phishing attacks, and how to avoid them. Protect yourself and your
                data with practical tips and awareness campaigns. Learn to identify red flags,
                secure your accounts, and navigate the digital world safely. Knowledge is your best
                defense against cybercriminals.
              </p>
              <Link href="/awareness">
                <button
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                    color: "#4fbcf3",
                    border: "1px solid #4fbcf3",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s",
                    width: "fit-content",
                  }}
                >
                  Learn More
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </button>
              </Link>
            </div>

          <div
            className="bg-card dark:bg-[rgba(79,188,243,0.05)] border-[rgba(79,188,243,0.3)] dark:border-[rgba(79,188,243,0.3)]"
            style={{
              padding: "2rem",
              borderRadius: "16px",
              border: "2px solid",
              transition: "all 0.3s",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
              <FileText
                className="text-[#4fbcf3] dark:text-[#4fbcf3]"
                style={{
                  width: "48px",
                  height: "48px",
                  marginBottom: "1.5rem",
                }}
              />
              <h3
                className="text-[#4fbcf3] dark:text-[#4fbcf3]"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                Blog
              </h3>
              <p
                className="text-foreground/80 dark:text-white/80"
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.7",
                  marginBottom: "1.5rem",
                  flexGrow: 1,
                }}
              >
                In-depth articles and tutorials on cybersecurity topics. Read expert insights,
                technical deep-dives, and practical guides written by security professionals. Stay
                informed about the latest trends, tools, and techniques in the cybersecurity
                field.
              </p>
              <Link href="/blog">
                <button
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                    color: "#4fbcf3",
                    border: "1px solid #4fbcf3",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s",
                    width: "fit-content",
                  }}
                >
                  Read Blog Posts
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </button>
              </Link>
            </div>
        </div>

        <div
          className="border-[rgba(79,188,243,0.2)] dark:border-[rgba(79,188,243,0.2)]"
          style={{
            marginTop: "4rem",
            paddingTop: "3rem",
            borderTop: "1px solid",
            textAlign: "center",
          }}
        >
          <p
            className="text-foreground/70 dark:text-white/70"
            style={{
              fontSize: "1.1rem",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            Join thousands of security enthusiasts learning and staying protected in the digital
            world. Start your cybersecurity journey today and build the skills needed to secure
            the future.
          </p>
        </div>
      </div>
    </div>
  );
}
