import { fetchProducts, fetchCategories } from '@/lib/api';
import { Product } from '@/types/product';
import ProductExplorerClient from '@/components/ProductExplorerClient';
import ThemeToggle from '@/components/ThemeToggle';

export default async function HomePage() {
  let products: Product[] = [];
  let categories: string[] = [];
  let error: string | null = null;

  try {
    [products, categories] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load products';
  }

  // If there was a server-side fetch error, let the client component
  // render the page header and an ErrorState. Avoid duplicating the
  // header here to prevent double rendering.
  if (error) {
    return (
      <ProductExplorerClient
        products={products}
        categories={categories}
        initialError={error}
      />
    );
  }

  return (
    <ProductExplorerClient
      products={products}
      categories={categories}
      initialError={null}
    />
  );
}
