import ProductExplorerClient from '@/components/ProductExplorerClient';

export default function HomePage() {
  // Fetch data on client to avoid Vercel/Cloudflare 403 blocking on server-side builds
  return (
    <ProductExplorerClient
      products={[]}
      categories={[]}
      initialError={null}
    />
  );
}
