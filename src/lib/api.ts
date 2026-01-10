import { Product } from '@/types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '<unable to read body>');
      const msg = `Failed to fetch products: ${response.status} ${response.statusText} - ${body}`;
      console.error(msg);
      throw new Error(msg);
    }

    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    const errMsg = error instanceof Error ? `Network error fetching products: ${error.message}` : 'Unknown error fetching products';
    console.error('Error fetching products:', error);
    throw new Error(errMsg);
  }
}

export async function fetchProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '<unable to read body>');
      const msg = `Failed to fetch product ${id}: ${response.status} ${response.statusText} - ${body}`;
      console.error(msg);
      throw new Error(msg);
    }

    const product: Product = await response.json();
    return product;
  } catch (error) {
    const errMsg = error instanceof Error ? `Network error fetching product ${id}: ${error.message}` : `Unknown error fetching product ${id}`;
    console.error(`Error fetching product ${id}:`, error);
    throw new Error(errMsg);
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '<unable to read body>');
      const msg = `Failed to fetch categories: ${response.status} ${response.statusText} - ${body}`;
      console.error(msg);
      throw new Error(msg);
    }

    const categories: string[] = await response.json();
    return categories;
  } catch (error) {
    const errMsg = error instanceof Error ? `Network error fetching categories: ${error.message}` : 'Unknown error fetching categories';
    console.error('Error fetching categories:', error);
    throw new Error(errMsg);
  }
}

