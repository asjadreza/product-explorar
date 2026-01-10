'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { toggleFavorite, isFavorite } from '@/lib/favorites';
import ErrorState from '@/components/ErrorState';
import { Heart, ArrowLeft, Star } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

interface ProductDetailClientProps {
  product: Product | null;
  initialError?: string | null;
}

export default function ProductDetailClient({
  product,
  initialError,
}: ProductDetailClientProps) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (product) {
      setFavorited(isFavorite(product.id));
    }
  }, [product]);

  const handleFavoriteToggle = () => {
    if (product) {
      toggleFavorite(product.id);
      setFavorited(!favorited);
    }
  };

  const handleRetry = () => {
    if (product) {
      window.location.reload();
    } else {
      router.push('/');
    }
  };

  if (initialError || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </Link>
            <ThemeToggle />
          </div>
          <ErrorState
            message={initialError || 'Product not found'}
            onRetry={handleRetry}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
          <ThemeToggle />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-96 md:h-auto bg-gray-100 dark:bg-gray-700">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium capitalize">
                  {product.category}
                </span>
                <button
                  onClick={handleFavoriteToggle}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      favorited
                        ? 'fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400'
                        : 'text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400'
                    } transition-colors`}
                  />
                </button>
              </div>

              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{product.title}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">{product.rating.rate}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Description</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

