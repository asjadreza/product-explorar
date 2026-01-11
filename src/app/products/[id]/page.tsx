import ProductDetailClient from '@/components/ProductDetailClient';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) {
    notFound();
  }

  // Fetch product on client to avoid Vercel/Cloudflare 403 blocking on server-side builds
  return <ProductDetailClient productId={productId} product={null} initialError={null} />;
}

