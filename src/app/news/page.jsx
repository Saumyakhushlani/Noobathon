"use client";

import NewsPage from '@/components/news/NewsPage';
import PageLoader from '@/components/PageLoader';

export default function Page() {
  return (
    <PageLoader>
      <NewsPage />
    </PageLoader>
  );
}
