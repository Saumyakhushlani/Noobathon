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
        console.log('NEWS_API_RESPONSE', json);
        if (json && 'success' in json && json.success) setItems(json.items ?? []);
      } catch (err) {
        console.error('NEWS_API_ERROR', err);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-fuchsia-50 px-4 py-10 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <NewsCard key={item.link ?? `${item.title}-${idx}`} item={item} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

