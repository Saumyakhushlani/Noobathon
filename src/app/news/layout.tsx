export const metadata = {
  title: "Latest Cybersecurity News | Security Updates & Threats",
  description: "Stay updated with the latest cybersecurity news, security breaches, threat intelligence, and information security updates. Get real-time cybersecurity news and analysis.",
  keywords: ["cybersecurity news", "security updates", "cyber threats", "security breaches", "threat intelligence", "information security news", "cyber security updates"],
  openGraph: {
    title: "Latest Cybersecurity News | Security Updates & Threats",
    description: "Stay updated with the latest cybersecurity news, security breaches, threat intelligence, and information security updates.",
    type: "website",
    url: "/news",
    siteName: "Cyber Security Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Cybersecurity News | Security Updates & Threats",
    description: "Stay updated with the latest cybersecurity news, security breaches, and threat intelligence.",
  },
  alternates: {
    canonical: "/news",
  },
};

export default function NewsLayout({ children }) {
  return children;
}
