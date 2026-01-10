# Product Explorer Dashboard

A modern, responsive web application built with Next.js, TypeScript, and Tailwind CSS that allows users to browse, search, filter, and manage favorite products from the FakeStore API.

## Features

### Core Features (All Implemented)

✅ **Product Listing Page**
- Fetches products from [FakeStore API](https://fakestoreapi.com/products)
- Responsive grid layout (1 column on mobile, 2 on tablet, 3-4 on desktop)
- Displays product image, title, price, and category
- Loading states with skeleton components
- Error handling with retry functionality

✅ **Search & Filtering**
- Real-time search by product title (client-side)
- Category filtering with visual buttons
- Combined search and filter functionality
- Product count display

✅ **Product Details Page**
- Dynamic routing using Next.js App Router (`/products/[id]`)
- Large product image display
- Full product information (title, description, price, category, rating)
- Navigation back to product list

✅ **Favorites Feature**
- Mark/unmark products as favorites
- Persists favorites using localStorage
- Filter to show only favorite products
- Visual indicator (heart icon) on product cards
- Favorites persist across page refreshes

✅ **Responsive Design**
- Mobile-first approach
- Optimized for mobile, tablet, and desktop viewports
- Touch-friendly interactive elements
- Responsive grid layouts

## Technical Implementation

### Stack
- **Next.js 16** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS 4**
- **React 19**

### Architecture

```
product-explorer/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Product listing page
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx     # Product details page
│   └── globals.css          # Global styles
├── components/
│   ├── ProductCard.tsx      # Individual product card component
│   ├── ProductGrid.tsx      # Grid layout for products
│   ├── SearchBar.tsx        # Search input component
│   ├── CategoryFilter.tsx   # Category filter buttons
│   ├── LoadingSkeleton.tsx  # Loading state skeleton
│   └── ErrorState.tsx       # Error display component
├── lib/
│   ├── api.ts               # API utility functions
│   └── favorites.ts         # localStorage favorites management
└── types/
    └── product.ts           # TypeScript type definitions
```

### Key Design Decisions

1. **Client Components**: Used `'use client'` directive for interactive features (search, filters, favorites) that require client-side state management.

2. **Type Safety**: All API responses and component props are fully typed with TypeScript interfaces. No `any` types used.

3. **Error Handling**: Comprehensive error handling with user-friendly error messages and retry functionality.

4. **State Management**: 
   - React hooks (`useState`, `useEffect`, `useMemo`) for component state
   - localStorage for favorites persistence
   - Client-side filtering for performance

5. **Performance**:
   - Next.js Image component for optimized image loading
   - `useMemo` for expensive filtering operations
   - API response caching with revalidation

6. **Accessibility**:
   - ARIA labels on interactive elements
   - Semantic HTML structure
   - Keyboard navigation support

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd product-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

- **Components**: Reusable UI components with proper TypeScript typing
- **Lib**: Utility functions for API calls and localStorage management
- **Types**: Centralized TypeScript type definitions
- **App Router**: Next.js 13+ App Router structure with server/client component separation

## Assumptions & Trade-offs

### Assumptions
1. The FakeStore API is available and stable
2. Users have JavaScript enabled (required for client-side features)
3. localStorage is available (for favorites persistence)
4. Modern browser support (ES2017+)

### Trade-offs
1. **Client-side Filtering**: All filtering happens client-side for instant feedback. For very large datasets, server-side filtering would be more appropriate.

2. **No Pagination**: All products are loaded at once. For production with large datasets, pagination or infinite scroll would be implemented.

3. **No Server Components for Main Page**: The main listing page uses client components for interactivity. Some parts could be server components for better performance.

4. **Simple Error Handling**: Error states are basic but functional. Production apps would benefit from more sophisticated error boundaries and logging.

5. **No Authentication**: Favorites are stored locally. In a production app, this would be synced with a backend.

## Future Enhancements (Bonus Features)

While not required, these could be added:
- Server Components for initial data fetching
- Pagination or infinite scroll
- Sorting by price (ascending/descending)
- Dark mode toggle
- Unit tests with Jest and React Testing Library
- Enhanced accessibility features
- Product comparison feature
- Share functionality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created as a technical assignment.
