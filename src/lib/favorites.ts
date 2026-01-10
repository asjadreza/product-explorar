const FAVORITES_STORAGE_KEY = 'product-explorer-favorites';

export function getFavorites(): number[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as number[];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
}

export function addFavorite(productId: number): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const favorites = getFavorites();
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding favorite to localStorage:', error);
  }
}

export function removeFavorite(productId: number): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const favorites = getFavorites();
    const updated = favorites.filter((id) => id !== productId);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error removing favorite from localStorage:', error);
  }
}

export function toggleFavorite(productId: number): void {
  const favorites = getFavorites();
  if (favorites.includes(productId)) {
    removeFavorite(productId);
  } else {
    addFavorite(productId);
  }
}

export function isFavorite(productId: number): boolean {
  const favorites = getFavorites();
  return favorites.includes(productId);
}

