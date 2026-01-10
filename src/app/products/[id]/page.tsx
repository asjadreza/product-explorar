import { fetchProductById } from '@/lib/api';
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

  let product = null;
  let error: string | null = null;

  try {
    product = await fetchProductById(productId);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load product details';
  }

  if (error || !product) {
    return (
      <ProductDetailClient
        product={null}
        initialError={error || 'Product not found'}
      />
    );
  }

  return <ProductDetailClient product={product} initialError={null} />;
}

