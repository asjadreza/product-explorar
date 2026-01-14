import ProductExplorerClient from '@/components/ProductExplorerClient';

export default function HomePage() {
  // Always fetch data on client to avoid Vercel/Cloudflare 403 blocking
  return <ProductExplorerClient />;
}