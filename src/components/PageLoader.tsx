"use client";

import * as React from "react";
import Loader from "@/components/Loading";

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background dark:bg-[#171717] min-h-screen w-full">
        <div className="w-full px-4">
          <Loader />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
