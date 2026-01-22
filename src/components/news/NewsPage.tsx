'use client';
import * as React from 'react';

import NewsCard, { type NewsItem } from '@/components/news/NewsCard';

type NewsApiResponse =
  | { success: true; items: NewsItem[] }
  | { success: false; error: string };

export default function NewsPage() {
  const [items, setItems] = React.useState<NewsItem[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/news');
        const json = (await res.json()) as NewsApiResponse;
        if (json && 'success' in json && json.success) setItems(json.items ?? []);
      } catch (err) {
      }
    })();
  }, []);

  return (
    <div
      className="min-h-screen px-4 py-10 md:px-8 md:mt-12 lg:px-16"
      style={{ background: "var(--news-bg)" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <NewsCard key={item.link ?? `${item.title}-${idx}`} item={item} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

