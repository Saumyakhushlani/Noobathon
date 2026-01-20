'use client';

import * as React from 'react';

export default function BlogPostPage({ id }: { id: string }) {
  return <div className="min-h-screen" data-post-id={id} />;
}

