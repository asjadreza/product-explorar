'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Heart } from 'lucide-react';
import { toggleFavorite, isFavorite } from '@/lib/favorites';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
  onFavoriteToggle?: () => void;
}

export default function ProductCard({ product, onFavoriteToggle }: ProductCardProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(product.id));
  }, [product.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
    setFavorited(!favorited);
    onFavoriteToggle?.();
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-900 transition-shadow duration-300 flex flex-col"
    >
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <button
        onClick={handleFavoriteClick}
        className="absolute cursor-pointer top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md dark:shadow-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          className={`w-5 h-5 ${
            favorited
              ? 'fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400'
              : 'text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400'
          } transition-colors`}
        />
      </button>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize">{product.category}</p>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-auto">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

