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

  // Show loading skeleton if there's an error (client component will handle error display)
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Product Explorer</h1>
            <ThemeToggle />
          </div>
          <ProductExplorerClient
            products={products}
            categories={categories}
            initialError={error}
          />
        </div>
      </div>
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
