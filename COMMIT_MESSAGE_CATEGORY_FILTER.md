feat: implement interactive category filter for posts page

- Add CategoryFilter component with dropdown UI and smooth animations
- Implement client-side filtering with real-time results
- Add search functionality for categories (when >5 categories)
- Create PostsClient component with active filter management
- Add enhanced version with sorting and view mode options
- Include responsive design for mobile/tablet/desktop
- Add framer-motion for smooth transitions and animations
- Implement empty state handling with user-friendly messages
- Add active filter tags with individual remove capability
- Include accessibility features (keyboard navigation, screen reader support)
- Add TypeScript support with proper type definitions
- Update posts page to fetch and display categories

Components added:
- src/components/CategoryFilter/index.tsx (basic version)
- src/components/CategoryFilter/Enhanced.tsx (with search)
- src/components/PostsClient/index.tsx (basic filtering)
- src/components/PostsClient/Enhanced.tsx (with sorting)

Features:
- Real-time category filtering
- Search within categories
- Active filter indicators
- Clear all filters functionality
- Post count display
- Smooth animations
- Responsive design
- Empty state handling
- Accessibility support

Dependencies added:
- framer-motion@^12.23.6 for animations

BREAKING CHANGE: Posts page now requires categories to be fetched alongside posts for filtering functionality
