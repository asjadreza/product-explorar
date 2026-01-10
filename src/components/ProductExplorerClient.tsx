"use client";

import { useState, useMemo, useEffect } from "react";
import { Product } from "@/types/product";
import { getFavorites } from "@/lib/favorites";
import { fetchProducts, fetchCategories } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ErrorState from "@/components/ErrorState";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Pagination from "@/components/Pagination";
import { Heart } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface ProductExplorerClientProps {
  products: Product[];
  categories: string[];
  initialError?: string | null;
}

export default function ProductExplorerClient({
  products: initialProducts,
  categories: initialCategories,
  initialError,
}: ProductExplorerClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isClientLoading, setIsClientLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [sortOrder, setSortOrder] = useState<"" | "default" | "asc" | "desc">(
    ""
  );
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [error, setError] = useState<string | null>(initialError || null);

  // Initialize favorites from localStorage and fetch data on client mount
  useEffect(() => {
    setFavorites(getFavorites());

    // If no products passed from server, fetch on client to bypass Vercel 403 blocks
    if (initialProducts.length === 0) {
      const fetchData = async () => {
        try {
          const [prods, cats] = await Promise.all([
            fetchProducts(),
            fetchCategories(),
          ]);
          setProducts(prods);
          setCategories(cats);
          setError(null);
        } catch (err) {
          const errorMsg =
            err instanceof Error ? err.message : "Failed to load products";
          setError(errorMsg);
        } finally {
          setIsClientLoading(false);
        }
      };

      fetchData();
    } else {
      // If server provided data, skip loading state
      setIsClientLoading(false);
    }
  }, [initialProducts.length]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    // Clear favorites filter when selecting a category
    if (showFavoritesOnly) {
      setShowFavoritesOnly(false);
    }
  };

  const handleFavoritesToggle = () => {
    const newFavoritesState = !showFavoritesOnly;
    setShowFavoritesOnly(newFavoritesState);
    // Clear category filter when toggling favorites
    if (newFavoritesState && selectedCategory) {
      setSelectedCategory(null);
    }
  };

  // Reset to first page when sort changes so users see top results
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder]);

  const filteredProducts = useMemo(() => {
    let filtered = products.slice();

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter((product) => favorites.includes(product.id));
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    // Apply sorting by price if requested (only for asc/desc)
    if (sortOrder === "asc") {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [
    products,
    searchQuery,
    selectedCategory,
    showFavoritesOnly,
    favorites,
    sortOrder,
  ]);

  // Reset page when filters change so the user sees first page of results
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

  const currentPageProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const handleFavoriteToggle = () => {
    setFavorites(getFavorites());
  };

  const handleRetry = () => {
    setError(null);
    setIsClientLoading(true);
    const fetchData = async () => {
      try {
        const [prods, cats] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(prods);
        setCategories(cats);
        setError(null);
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Failed to load products";
        setError(errorMsg);
      } finally {
        setIsClientLoading(false);
      }
    };
    fetchData();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Product Explorer
            </h1>
            <ThemeToggle />
          </div>
          <ErrorState message={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  if (isClientLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Product Explorer
            </h1>
            <ThemeToggle />
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Product Explorer
          </h1>
          <ThemeToggle />
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* <div className="flex items-center gap-3">
              <label htmlFor="sort-select" className="sr-only">Sort by</label>
              <select
                id="sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as '' | 'default' | 'asc' | 'desc')}
                className="w-32 px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                aria-label="Sort products by price"
              >
                <option value="default">Default</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>

              <button
                onClick={handleFavoritesToggle}
                className={`px-6 py-2 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-2 ${
                  showFavoritesOnly
                    ? 'bg-red-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                aria-label={showFavoritesOnly ? 'Show all products' : 'Show favorites only'}
              >
                <Heart
                  className={`w-5 h-5 ${
                    showFavoritesOnly ? 'fill-white' : ''
                  }`}
                />
                {showFavoritesOnly ? 'Show All' : 'Favorites'}
              </button>
            </div> */}

            <div className="flex items-center gap-3">
              <label htmlFor="sort-select" className="sr-only">
                Sort by
              </label>
              <select
                id="sort-select"
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "default" | "asc" | "desc")
                }
                className="w-25 px-1 py-2 rounded-lg font-medium cursor-pointer transition-colors bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                aria-label="Sort products by price"
              >
                <option value="" disabled hidden>
                  Sort by
                </option>
                <option value="default">Default</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>

              <button
                onClick={handleFavoritesToggle}
                className={`px-6 py-2 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-2 ${
                  showFavoritesOnly
                    ? "bg-red-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                aria-label={
                  showFavoritesOnly
                    ? "Show all products"
                    : "Show favorites only"
                }
              >
                <Heart
                  className={`w-5 h-5 ${showFavoritesOnly ? "fill-white" : ""}`}
                />
                {showFavoritesOnly ? "Show All" : "Favorites"}
              </button>
            </div>
          </div>

          {!showFavoritesOnly && (
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          )}

          {/* Active Filters Indicator */}
          {(showFavoritesOnly ||
            selectedCategory ||
            searchQuery.trim() ||
            sortOrder === "asc" ||
            sortOrder === "desc") && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Active filters:
              </span>
              {showFavoritesOnly && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4 fill-red-600 dark:fill-red-400" />
                  Favorites
                </span>
              )}
              {(sortOrder === "asc" || sortOrder === "desc") && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  Sort: {sortOrder === "asc" ? "Low → High" : "High → Low"}
                  <button
                    onClick={() => setSortOrder("")}
                    className="ml-1 cursor-pointer hover:text-green-900 dark:hover:text-green-200 hover:scale-115"
                    aria-label="Clear sort"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium capitalize">
                  {selectedCategory}
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className="ml-1 cursor-pointer hover:text-blue-900 dark:hover:text-blue-200 hover:scale-115"
                    aria-label="Clear category filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 hover:scale-115"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setShowFavoritesOnly(false);
                  setSelectedCategory(null);
                  setSearchQuery("");
                  setSortOrder("");
                }}
                className="text-sm cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {filteredProducts.length === 0 ? (
            <>No products found</>
          ) : (
            <>
              Showing{" "}
              {filteredProducts.length === 0
                ? 0
                : Math.min(
                    (currentPage - 1) * pageSize + 1,
                    filteredProducts.length
                  )}{" "}
              - {Math.min(currentPage * pageSize, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </>
          )}
        </div>

        <ProductGrid
          products={currentPageProducts}
          onFavoriteToggle={handleFavoriteToggle}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) =>
            setCurrentPage(Math.min(Math.max(1, p), totalPages))
          }
        />
      </div>
    </div>
  );
}
