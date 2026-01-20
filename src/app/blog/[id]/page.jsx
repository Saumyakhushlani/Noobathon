import BlogPostPage from '@/components/blog/BlogPostPage';

export default function Page({ params }) {
  return <BlogPostPage id={params.id} />;
}
