import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ScrollNavigationMenu from "@/components/scroll-navigation-menu";
import FooterWrapper from "@/components/FooterWrapper";
import { THEME_STORAGE_KEY } from "@/store/theme-constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cyber Security Hub | Learn, Practice & Master Cybersecurity",
    template: "%s | Cyber Security Hub"
  },
  description: "Learn, practice, and master cybersecurity. Explore roadmaps, read the latest news, stay aware of common threats, and access expert insights on information security.",
  keywords: ["cybersecurity", "information security", "cyber awareness", "security training", "cybersecurity roadmap", "cyber threats", "security tips", "cybersecurity education"],
  authors: [{ name: "Cyber Security Hub" }],
  creator: "Cyber Security Hub",
  publisher: "Cyber Security Hub",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cybersecurityhub.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Cyber Security Hub",
    title: "Cyber Security Hub | Learn, Practice & Master Cybersecurity",
    description: "Learn, practice, and master cybersecurity. Explore roadmaps, read the latest news, stay aware of common threats, and access expert insights.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cyber Security Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Security Hub | Learn, Practice & Master Cybersecurity",
    description: "Learn, practice, and master cybersecurity. Explore roadmaps, read the latest news, stay aware of common threats.",
    creator: "@cybersecurityhub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <head>
          <script
            // Set theme class before paint to avoid flash.
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var k=${JSON.stringify(
                THEME_STORAGE_KEY
              )};var t=localStorage.getItem(k);if(t==="light"){document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");}}catch(e){document.documentElement.classList.add("dark");}})();`,
            }}
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-background text-foreground`}
        >
          <ScrollNavigationMenu />
          {children}
          <FooterWrapper />
        </body>
      </ClerkProvider>
    </html>
  );
}
