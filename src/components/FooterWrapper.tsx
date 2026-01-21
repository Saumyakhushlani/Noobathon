"use client";

import { usePathname } from "next/navigation";
import { Component as Footer } from "@/components/flickering-footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Hide footer on auth pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }
  
  return <Footer />;
}
